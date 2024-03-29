import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../context/dbUserContext';
import InputTicketForm from '../components/InputTicketForm';
import {
  PrimaryServiceCategories,
  // ThirdLevelServiceDetails,
  DepartmentOptions,
  LocationOptions,
  PriorityOptions,
  AgentOptions,
} from '../utils/ticketCategories';
import axios from 'axios';
// docs to package here; https://www.npmjs.com/package/react-toastify
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inputTicketSchema } from '../constants/formValidationSchemas';
import { createTicketRoute, imagePostRoute, sendEmailRoute } from '../constants/apiRoutes';

export default function TicketFormContainer({ children, ...restProps }) {
  let history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formClassname =
    'p-8 mx-auto text-text-base bg-off-base rounded-lg max-w-max sm:max-w-lg';

  const labelClassNames = 'block mt-3';

  const inputClassNames =
    'block p-1 rounded-sm text-text-base-inverted w-56 l lg:w-72';

  const { mysqlUser, getDbUsersTickets, auth0UserMeta, getAllTickets } =
    useContext(UserContext);

  // default values pulled from context and passed into React-hook-form
  const defaultValues = {
    client_full_name: mysqlUser.fname + ' ' + mysqlUser.lname,
    department_id: mysqlUser.department_id,
    location_id: mysqlUser.location_id,
    client_phone_number: mysqlUser.mobile_phone,
    email: mysqlUser.email,
    subject: ' ',
    service_id: '1',
    service_details_id: '1',
    priority_id: '1',
    description: ' ',
    files: null,
  };

  // This is passed into React-hook form and is invoked before submission for client side validation
  const resolver = yupResolver(inputTicketSchema);



  async function onSubmit(data, event) {
    event.preventDefault();
    setIsSubmitting(true);
    // desturcturing out files to make a separate api call IF They exist... ~wk 5/4
    let { files, ...restdata } = data;

    async function submitFiles(id) {
      if (!files.length) {
        return null;
      } else {
        const data = new FormData();
        [...files].forEach((f) => {
          data.append('files', f);
        });
        data.append('ticket_id', id); //@@ sends to req body to attach
        let response = await fetch(imagePostRoute, {
          method: 'post',
          body: data,
        });
        console.log(response);
        if (!response.ok) {
          toast.error('Problem with File Upload', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return response;
      }
    }





    // ! SUPPLMENTING  TICKET INPUTTED DATA WITH AUTH INFO; restdata is picked off above to separate from files
    restdata.status_id = '1'; //default of open; not from form;send...
    restdata.client_id = mysqlUser.id; // attaching the user's ID to the ticket
    // # this line filters out null values from the Object...
    restdata = Object.fromEntries(
      Object.entries(restdata).filter(([item, val]) => val)
    );
    // Posting new TICKETS

    try {
      let response = await fetch(createTicketRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restdata),
      });
      let result = await response.json();
      let filesSentResponse;
      if (files.length) {
        filesSentResponse = await submitFiles(result.insertId);
      }
      console.log(filesSentResponse);
      if (response.ok) {
        if (auth0UserMeta?.isAdmin) {
          await getAllTickets();
        } else {
          await getDbUsersTickets(); //runs set state on tickets to re-render tickets view
        }
        toast.success('Ticket Successfully Created', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (!response.ok) {
        toast.error('Ticket Not Created', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      //FORM WILL RESET DUE USEEFFECT HOOK IN THE COMPONENT FILE AND GO BACK TO DEFAULT VALUES
    } catch (error) {
      console.warn(error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        history.push('/');
      }, 1350);
    }
   // sendNewTicket(restdata)
      //* TRYING TO SEND A EMAIL WHEN INPUT TICKET HAS BEEN SUBMITTED
  //? Where does this need to be - When the SUBMIT button is Pressed
  //? variables in the back 
  //* RECIPIENT - ?
  //* typeOfNotification - newTicket
  //* Text - Description of Ticket
  //? Making a function to send all details.




  }


 async function sendNewTicket(restdata) {

    try {
     await fetch (sendEmailRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({toReceive:"itadmin@mema.ms.gov", typeOfNotification: "newTicket", subject:`Subject: ${restdata.subject}`, text:`Description: ${restdata.description}` })
      })
    } catch (error) {
      console.log(error)
    }
  }

  // try {
  //   axios.post("http://10.250.138.46:3075/api/mail/sendNotification", {typeOfNotification: 'newTicket', recipientSentee: 'mvalencia@mema.ms.gov', text:restdata.description})
  // } catch (error) {
  //   console.log(error)
  // }
  // Extra field for admins to assign an agent during ticket creation  ~wk 5/4/2021
  function showAssignAgentToAdmins() {
    if (auth0UserMeta.isAdmin) {
      return (
        <InputTicketForm.Select
          options={<AgentOptions />}
          name={'agent_id'}
          label="Assign an Agent"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <InputTicketForm
        onSubmit={onSubmit}
        classNames={formClassname}
        defaultValues={defaultValues}
        resolver={resolver}
      >
        <InputTicketForm.Heading />
        <InputTicketForm.Input
          name={'client_full_name'}
          label="Full Name"
          placeholder="Your name"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Select
          options={<DepartmentOptions />}
          name={'department_id'}
          label="Department"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Select
          options={<LocationOptions />}
          name={'location_id'}
          label="Location"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Input
          name={'client_phone_number'}
          label="Phone Number"
          type={'tel'}
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Input
          name={'email'}
          label="Email"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Input
          name={'subject'}
          label="Subject"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />

        <InputTicketForm.Select
          options={<PrimaryServiceCategories />}
          name={'service_id'}
          label="Service Type"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Select
          options={<PrimaryServiceCategories />}
          name={'service_details_id'}
          useWatchOptions={true}
          label="Service Details"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        <InputTicketForm.Select
          options={<PriorityOptions />}
          name={'priority_id'}
          label="Priority"
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
        />
        {showAssignAgentToAdmins()}
        <InputTicketForm.TextArea
          label="Description"
          name="description"
          placeholder="Please write a short description here"
          labelClassNames={labelClassNames}
        />
        <InputTicketForm.FileUpload
          name={'files'}
          label="Upload up to 3 files"
          multiple
          labelClassNames={labelClassNames}
          inputClassNames={inputClassNames}
          type={'file'}
        />

        <InputTicketForm.Submit
          type="submit"
          value="Submit"
          onClick={onSubmit}
          isSubmitting={isSubmitting}
          classNames="block px-2 py-1 mx-auto mt-3 font-bold text-text-base-inverted bg-light-base rounded-md hover:bg-action hover:text-text-base"
        />
      </InputTicketForm>
      {/* The toast Package handles the positioning of this... link to doc found above... Thus can sit at bottom of this file */}
      <ToastContainer transition={Zoom} />
    </>
  );
}
