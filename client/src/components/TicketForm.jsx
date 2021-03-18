import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/dbUserContext';
import SubServiceType from '../utils/ticketCategories';
import { WarningIcon } from './Icons';
import {
  departmentWordToValue,
  locationWordToValue,
} from '../utils/sqlFormHelpers';

// docs to package here; https://www.npmjs.com/package/react-toastify
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InputTicketForm() {
  const { register, handleSubmit, watch, errors, reset } = useForm();
  const { mysqlUser, getDbUsersTickets } = useContext(UserContext);

  // watch input value by passing the name of it, second param is default
  const mainServicetype = watch('service_id', '1');

  //   todo: push to DB;   May need to move ticket state up into a context provider?
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
  // todo: extract to a util to import wherever this a reactHook form likely; Don't forget you can search references; ~wk 3-15;
  function ErrorMessage(prop, subject) {
    if (errors[prop]) {
      return (
        <p className="text-red-700">
          <WarningIcon />
          {subject} is required
        </p>
      );
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
            ref={register({ required: true })}
          />
          {ErrorMessage('client_full_name', 'Your name')}
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
            ref={register({ required: true })}
          >
            <option value="1">Executive </option>
            <option value="2">Preparedness </option>
            <option value="3">Mitigation </option>
            <option value="4">Warehouse </option>
            <option value="5">Support Services </option>
            <option value="6">Human Resources </option>
            <option value="7">Maintenance </option>
            <option value="8">Recovery </option>
            <option value="9">Field Services </option>
            <option value="10">External Affairs </option>
            <option value="11">Logistics </option>
            <option value="12">Operations </option>
            <option value="13">Individual Assistance</option>
            <option value="14">Information Technology</option>
          </select>
        </label>
        {ErrorMessage('Department')}
        {/* //@@ Location/ */}
        <label className="block mt-3">
          Location
          <select
            defaultValue={mysqlUser && locationWordToValue(mysqlUser.location)}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="location_id"
            ref={register({ required: true })}
          >
            <option value="1">HQ(Pearl)</option>
            <option value="2">Warehouse(Byram)</option>
            <option value="3">Bolton Building (Biloxi)</option>
          </select>
        </label>
        {ErrorMessage('Location')}
        {/* //@@ Phone */}
        <label className="block mt-3">
          Phone Number
          {/* //todo add validation here? */}
          <input
            defaultValue={mysqlUser && mysqlUser.mobile_phone}
            name="client_phone_number"
            type="tel"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Phone Number')}
        {/* //@@ Email */}
        <label className="block mt-3">
          Email
          {/* //todo add validation here? */}
          <input
            defaultValue={mysqlUser && mysqlUser.email}
            name="email"
            type="text"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Email')}
        {/* //@@ Subject */}
        <label className="block mt-3">
          Subject
          <input
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="subject"
            type="text"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Subject')}
        {/* //@@Service type */}
        <label className="block mt-3">
          Service Type
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="service_id"
            ref={register({ required: true })}
          >
            {/* // todo:refactor options lists to external components for singularity of data;  ALSO located in ticket.jsx can use the constants folder for such;*/}
            <option value="1">Building</option>
            <option value="2">IT</option>
            <option value="3">Communications</option>
            <option value="4">GIS</option>
            <option value="5">Employee Setup</option>
            <option value="6">Wasp Inventory System</option>
            <option value="7">Surveilance Camera System</option>
            <option value="8">Training</option>
            <option value="9">Thermoscan Account</option>
          </select>
        </label>
        {ErrorMessage('Service Type')}
        {/* //@@Sub-Service type */}
        <label className="block mt-3 w-52 lg:w-72">
          Detail:
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="service_details_id"
            ref={register({ required: true })}
          >
            {SubServiceType(mainServicetype)}
          </select>
        </label>
        {ErrorMessage('Service Detail')}
        {/* //@@ Priority/ */}
        <label className="block mt-3">
          Priority
          <select
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="priority_id"
            ref={register({ required: true })}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">Urgent</option>
          </select>
        </label>
        {/* //@@ Description */}
        <label className="block mt-3">
          Description
          <textarea
            className="block p-2 text-black py-0.5 px-1"
            ref={register({ required: true })}
            name="description"
            cols="38"
            rows="5"
            placeholder="Please write a short description here"
          />
        </label>
        {ErrorMessage('Service Description')}
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