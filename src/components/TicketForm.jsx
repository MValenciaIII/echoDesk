import React from 'react';
import { useForm } from 'react-hook-form';
import SubServiceType from '../utils/ticketCategories';

export default function InputTicketForm() {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const mainServicetype = watch('serviceType', 'Building'); // watch input value by passing the name of it

  /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
  return (
    <form className="bg-blue-300 p-4" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}

      {/* //@@ Full Name */}
      <label className="block">
        Full Name
        <input
          className="block"
          name="fullName"
          type="text"
          placeholder="Your name"
          ref={register({ required: true })}
        />
      </label>
      {errors.fullName && (
        <p className="text-red-600">First name is required</p>
      )}
      {/* //@@ DEPARTMENT */}
      <label className="block mt-3">
        Department
        <select
          className="block"
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
          <option value="InidividualAssistance">Inidividual Assistance</option>
          <option value="InformationTechnology">Information Technology</option>
        </select>
      </label>

      {/* //@@ Location/ */}
      <label className="block mt-3">
        Location
        <select
          className="block"
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
          className="block"
          ref={register({ required: true })}
        />
      </label>

      {/* //@@ Subject */}
      <label className="block mt-3">
        Subject
        <input
          className="block"
          name="subject"
          type="text"
          ref={register({ required: true })}
        />
      </label>

      {/* //@@Service type */}
      <label className="block mt-3">
        Service Type
        <select
          className="block "
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
      <label className="block mt-3">
        Detail:
        <select
          className="block "
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
          className="block"
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
          className="block p-2"
          ref={register({ required: true })}
          name="description"
          cols="35"
          rows="5"
          placeholder="Please write a short description here"
        />
      </label>
      {/* errors will return when field validation fails  */}
      {errors.fullName && (
        <span className="text-red-600">This field is required</span>
      )}
      <input
        className="block mt-3 px-2 py-1 font-bold rounded-md hover:text-blue-800 bg-gray-200"
        name="Submit"
        type="submit"
      />
    </form>
  );
}
