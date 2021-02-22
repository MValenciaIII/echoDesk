import React from 'react';
import { useForm } from 'react-hook-form';
import SubServiceType from '../utils/ticketCategories';
import { WarningIcon } from './Icons';

export default function InputTicketForm() {
  const { register, handleSubmit, watch, errors } = useForm();

  //   todo: push to DB;   May need to move ticket state up into a context provider?
  const onSubmit = (data) => console.log(data);

  // watch input value by passing the name of it, second param is default
  const mainServicetype = watch('serviceType', 'Building');

  function ErrorMessage(prop) {
    if (errors[prop]) {
      return (
        <p className="text-red-700">
          <WarningIcon />
          First name is required
        </p>
      );
    }
  }

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  return (
    <form
      className="bg-gray-800 p-4 mx-auto "
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
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
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="fullName"
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
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="department"
            ref={register({ required: true })}
          >
            <option value="Executive">Executive</option>
            <option value="Preparedness">Preparedness</option>
            <option value="Warehouse">Warehouse</option>
            <option value="SupportServices">Support Services</option>
            <option value="HumanResources">Human Resources</option>
            <option value="Maintenance">Maintenance</option>
            <option value="FieldServices">Field Services</option>
            <option value="ExternalAffairs">External Affairs</option>
            <option value="Logistics">Logistics</option>
            <option value="Operations">Operations</option>
            <option value="InidividualAssistance">
              Inidividual Assistance
            </option>
            <option value="InformationTechnology">
              Information Technology
            </option>
          </select>
        </label>

        {/* //@@ Location/ */}
        <label className="block mt-3">
          Location
          <select
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="location"
            ref={register({ required: true })}
          >
            <option value="Pearl">HQ(Pearl)</option>
            <option value="Warehouse">Warehouse(Byram)</option>
            <option value="BoltonBuilding">Bolton Building (Biloxi)</option>
          </select>
        </label>

        {/* //@@ Phone */}
        <label className="block mt-3">
          Phone Number
          {/* //todo add validation here? */}
          <input
            name="phone"
            type="tel"
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            ref={register({ required: true })}
          />
        </label>

        {/* //@@ Subject */}
        <label className="block mt-3">
          Subject
          <input
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="subject"
            type="text"
            ref={register({ required: true })}
          />
        </label>

        {/* //@@Service type */}
        <label className="block mt-3">
          Service Type
          <select
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="serviceType"
            ref={register({ required: true })}
          >
            <option value="Building">Building</option>
            <option value="IT">IT</option>
            <option value="Communications">Communications</option>
            <option value="GIS">GIS</option>
            <option value="Employee Setup">Employee Setup</option>
          </select>
        </label>

        {/* //@@Sub-Service type */}
        <label className="block mt-3 w-52 lg:w-72">
          Detail:
          <select
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="subServiceType"
            ref={register({ required: true })}
          >
            {SubServiceType(mainServicetype)}
          </select>
        </label>

        {/* //@@ Priority/ */}
        <label className="block mt-3">
          Priority
          <select
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="priority"
            ref={register({ required: true })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </label>

        {/* //@@ Description */}
        <label className="block mt-3">
          Description
          <textarea
            className="block p-2 text-black py-0.5 px-1"
            ref={register({ required: true })}
            name="description"
            cols="30"
            rows="5"
            placeholder="Please write a short description here"
          />
        </label>
        {/* errors will return when field validation fails  */}

        <input
          className="block mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black "
          name="Submit"
          type="submit"
        />
      </div>
    </form>
  );
}
