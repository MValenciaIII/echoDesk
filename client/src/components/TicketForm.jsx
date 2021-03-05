import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { UserContext } from '../context/dbUserContext';
import SubServiceType from '../utils/ticketCategories';
import { WarningIcon } from './Icons';
import {
  departIdToWord,
  locationWordToValue,
  priorityWordToNumID,
  serviceDetailsWordToNumId,
} from '../utils/sqlFormHelpers';

export default function InputTicketForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { mysqlUser } = useContext(UserContext);

  // watch input value by passing the name of it, second param is default
  const mainServicetype = watch('service_id', '1');

  //   todo: push to DB;   May need to move ticket state up into a context provider?
  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  function onSubmit(data, event) {
    event.preventDefault();

    // body.agent_id = null; //unassiepartmentWordToValue(data.department_id);
    // body.location_id = locationWordToValue(data.location_id);
    // body.priority_id = priorityWordToNumID(data.priority_id);
    data.status_id = '1'; //default of open; not from form;gned....
    data.client_id = mysqlUser.id;
    console.log(data);

    // ! SUPPLMENTING DATA WITH AUTH INFO;

    debugger;

    // let valueToSubmit2 = { ...data, id: 'auth0|603d06a199dbeb0068b68f69' };

    // Posting new TICKETS
    fetch('http://10.195.103.107:3075/api/tickets/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((message) => console.log(message))
      .catch((error) => console.log({ error }));
  }

  function ErrorMessage(prop) {
    if (errors[prop]) {
      return (
        <p className="text-red-700">
          <WarningIcon />
          {prop} is required
        </p>
      );
    }
  }

  return (
    <form
      className="bg-gray-800 p-4 mx-auto "
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* YOU MUST register your input into the hook by invoking the "register" function */}
      <h2 className="mx-auto max-w-max text-2xl font-bold mb-2 text-white">
        Submit a New Ticket
      </h2>
      <div
        id="formInputsContainer"
        className="max-w-max sm:max-w-lg mx-auto bg-gray-700 rounded-lg p-8 text-white"
      >
        {/* //@@ Full Name */}
        <label className="block ">
          Full Name
          <input
            defaultValue={
              mysqlUser ? mysqlUser.fname + ' ' + mysqlUser.lname : ''
            }
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="client_full_name"
            type="text"
            placeholder="Your name"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('fullName')}

        {/* //@@ DEPARTMENT */}
        <label className="block mt-3">
          Department
          <select
            defaultValue={mysqlUser ? mysqlUser.department : ''}
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            defaultValue={mysqlUser && mysqlUser.location}
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Email')}

        {/* //@@ Subject */}
        <label className="block mt-3">
          Subject
          <input
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="service_id"
            ref={register({ required: true })}
          >
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
        <input type="file" name="fileUpload" ref={register} />
        errors will return when field validation fails  */}

        <input
          className="block mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black "
          name="Submit"
          type="submit"
        />
      </div>
    </form>
  );
}
