import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserContext } from '../context/dbUserContext';
import {
  subServiceTypes,
  PrimaryServiceCategories,
  ThirdLevelServiceDetails,
} from '../utils/ticketCategories';

import {
  departmentWordToValue,
  locationWordToValue,
} from '../utils/sqlFormHelpers';

// docs to package here; https://www.npmjs.com/package/react-toastify
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { inputTicketSchema } from '../constants/formValidationSchemas';
import ErrorMessage from '../components/ErrorMessage';

export default function InputTicketForm() {
  const { register, handleSubmit, watch, errors, reset } = useForm({
    resolver: yupResolver(inputTicketSchema),
  });
  const { mysqlUser, getDbUsersTickets } = useContext(UserContext);
  console.log(mysqlUser);

  // watch input value by passing the name of it, second param is default
  const mainServicetype = watch('service_id', '1');
  //todo: for 3rd dropdown of details
  // const secondaryServicetype = watch('service_details_id', '1');

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  async function onSubmit(data, event) {
    // todo: REMOVE DEBUGGER WHEN NEEDED;
    // debugger;

    event.preventDefault();

    // ! SUPPLMENTING DATA WITH AUTH INFO;
    data.status_id = '1'; //default of open; not from form;send....
    data.client_id = mysqlUser.id; // attaching the user's ID to the ticket
    console.log(data);

    // Posting new TICKETS
    try {
      let response = await fetch(
        'http://10.195.103.107:3075/api/tickets/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      let result = await response.json();
      console.log(result);
      // todo: get INSERTID from RESULT to MAKE SUBSEQUENT POST CALL IF THERE ARE FILES ATTACHED;
      await getDbUsersTickets(); //runs set state on tickets to re-render tickets view
      reset(); //reset the form

      toast.success('Ticket submitted successfully!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <form className="p-4 bg-gray-800 " onSubmit={handleSubmit(onSubmit)}>
      {/* YOU MUST register your input into the hook by invoking the "register" function */}
      <h2 className="mx-auto mb-2 text-2xl font-bold text-white max-w-max">
        Submit a New Ticket
      </h2>
      <div
        id="formInputsContainer"
        className="p-8 mx-auto text-white bg-gray-700 rounded-lg max-w-max sm:max-w-lg"
      >
        {/* //@@ Full Name */}
        <label className="block ">
          Full Name
          <input
            defaultValue={
              mysqlUser ? mysqlUser.fname + ' ' + mysqlUser.lname : ''
            }
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="client_full_name"
            type="text"
            placeholder="Your name"
            ref={register()}
          />
          {errors.client_full_name?.message && (
            <ErrorMessage message={errors.client_full_name.message} />
          )}
        </label>

        {/* //@@ DEPARTMENT */}
        <label className="block mt-3">
          Department
          <select
            defaultValue={
              mysqlUser ? departmentWordToValue(mysqlUser.department) : ''
            }
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="department_id"
            ref={register()}
          >
            <PrimaryServiceCategories />
          </select>
          {errors.department_id?.message && (
            <ErrorMessage message={errors.department_id.message} />
          )}
        </label>

        {/* //@@ Location/ */}
        <label className="block mt-3">
          Location
          <select
            defaultValue={mysqlUser && locationWordToValue(mysqlUser.location)}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="location_id"
            ref={register()}
          >
            <option value="1">HQ(Pearl)</option>
            <option value="2">Warehouse(Byram)</option>
            <option value="3">Bolton Building (Biloxi)</option>
          </select>
          {errors.location_id?.message && (
            <ErrorMessage message={errors.location_id.message} />
          )}
        </label>

        {/* //@@ PHONE */}
        <label className="block mt-3">
          Phone Number
          <input
            defaultValue={mysqlUser && mysqlUser.mobile_phone}
            name="client_phone_number"
            type="tel"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register()}
          />
        </label>
        {errors.client_phone_number?.message && (
          <ErrorMessage message={errors.client_phone_number.message} />
        )}

        {/* //@@ Email */}
        <label className="block mt-3">
          Email
          <input
            defaultValue={mysqlUser && mysqlUser.email}
            name="email"
            type="text"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register()}
          />
        </label>
        {errors.email?.message && (
          <ErrorMessage message={errors.email.message} />
        )}
        {/* //@@ Subject */}
        <label className="block mt-3">
          Subject
          <input
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="subject"
            type="text"
            ref={register()}
          />
        </label>
        {errors.subject?.message && (
          <ErrorMessage message={errors.subject.message} />
        )}
        {/* //@@Service type */}
        <label className="block mt-3">
          Service Type
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="service_id"
            ref={register()}
          >
            {/* // todo:refactor options lists to external components for singularity of data;  ALSO located in ticket.jsx can use the constants folder for such;*/}
            <PrimaryServiceCategories />
          </select>
        </label>
        {errors.service_id?.message && (
          <ErrorMessage message={errors.service_id.message} />
        )}
        {/* //@@Sub-Service type */}
        <label className="block mt-3 w-52 lg:w-72">
          Detail:
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="service_details_id"
            ref={register()}
          >
            {subServiceTypes(mainServicetype)}
          </select>
        </label>
        {errors.service_details_id?.message && (
          <ErrorMessage message={errors.service_details_id.message} />
        )}

        {/* //todo: try to make coordinated thing later; */}
        {/* //@@ THIRD LEVEL SERVICE DETAILS */}
        {/* //@@Sub-Service type */}
        {/* {ThirdLevelServiceDetails(secondaryServicetype) && (
          <label className="block mt-3 w-52 lg:w-72">
            Specific Service;
            <select
              className="block px-2 py-1 text-black rounded w-52 lg:w-72"
              name="specific_service"
              ref={register()}
            >
              {ThirdLevelServiceDetails(secondaryServicetype)}
            </select>
          </label>
        )} */}
        {/* {errors.specific_service?.message && (
          <ErrorMessage message={errors.specific_service.message} />
        )} */}

        {/* //@@ Priority/ */}
        <label className="block mt-3">
          Priority
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="priority_id"
            ref={register()}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
          </select>
          {errors.priority_id?.message && (
            <ErrorMessage message={errors.priority_id.message} />
          )}
        </label>

        {/* //@@ Priority/ */}
        {mysqlUser.isAdmin && (
          <label className="block mt-3">
            Assign To Agent
            <select
              className="block px-2 py-1 text-black rounded w-52 lg:w-72"
              name="agent_id"
              ref={register()}
            >
              {/* //todo: ADD IN AGENTS OPTIONS HERE FROM AN EXTERNAL SOURCE OF TRUTH THAT WILL BE AVAILABLE TO HERE AND THE TICKET ITSELF FOR CHANGING */}
            </select>
            {errors.priority_id?.message && (
              <ErrorMessage message={errors.priority_id.message} />
            )}
          </label>
        )}

        {/* //@@ Description */}
        <label className="block mt-3">
          Description
          <textarea
            className="block p-2 text-black py-0.5 px-1"
            ref={register()}
            name="description"
            cols="38"
            rows="5"
            placeholder="Please write a short description here"
          />
        </label>
        {errors.description?.message && (
          <ErrorMessage message={errors.description.message} />
        )}
        {/* <label className="block mt-3" htmlFor="fileUpload">
          Please attach any relevant files here;
        </label>
        <input type="file" name="fileUpload" ref={register} multiple /> */}

        <input
          className="block px-2 py-1 mx-auto mt-3 font-bold text-black bg-gray-200 rounded-md hover:bg-green-900 hover:text-white "
          type="submit"
          name="Submit"
          value="Submit"
        />
        <ToastContainer transition={Zoom} />
      </div>
    </form>
  );
}
