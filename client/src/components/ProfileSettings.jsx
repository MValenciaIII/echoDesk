import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';

import useUserMetadata from '../auth/getUserMeta';
import { WarningIcon } from './Icons';

export default function ProfileSetttings() {
  //   const { user_metadata } = useUserMetadata();

  //   user return from useAuth
  const { user } = useAuth0();

  // todo: get user referencing sub of user from auth0
  //if(user_metadata_admin) {
  //   post to admin table via api
  // } else {
  // post to client api
  // }
  //   const userFromSQL = fetch(user.sub)

  //   ?@@ SAMPLE USER HERE TO AVOID AUTH API
  //   const user = {
  //     firstName: 'Will',
  //     lastName: 'Kelly',
  //     department: 'InformationTechnology',
  //     location: 'Warehouse',
  //     phone: '555-555-5555',
  //   };
  //   default values from this package explained here:
  // https://react-hook-form.com/api/
  const { register, handleSubmit, errors } = useForm();

  const [isEditing, setisEditing] = useState(false);
  const [formFieldOriginalState, setFormFieldOriginalState] = useState(null);

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER;  Or update meta in auth0?
  const onSubmit = (data) => console.log(data);

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
  function handleProfileEdits(event, action) {
    setisEditing(!isEditing);

    if (action === 'START_UPDATES') {
      let fieldsToEdit = [
        ...document.querySelectorAll('[data-role="profileSetting"]'),
      ];
      setFormFieldOriginalState(fieldsToEdit);
      fieldsToEdit.forEach((field) => {
        field.readOnly = false;
        field.disabled = false;
      });
    } else if (action === 'CANCEL_UPDATES') {
      for (let i = 0; i < formFieldOriginalState.length; i++) {
        const field = formFieldOriginalState[i];
        field.value = field.defaultValue || field.dataset.defaultvalue || null; //for select elements that don't have a default value; lower case for dataset
        formFieldOriginalState.forEach((field) => {
          field.readOnly = true;
          field.disabled = true;
        });
      }
      console.log('saving profile Edits!');
    }
  }

  return (
    <form
      className="bg-gray-800 p-4 mx-auto flex-grow w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <h2 className="mx-auto max-w-max text-2xl font-bold mb-2 text-white">
        Update your profile settings
      </h2>
      <div
        id="formInputsContainer"
        className="max-w-max sm:max-w-lg mx-auto bg-gray-700 rounded-lg p-8 text-white"
      >
        {/* //@@ Full Name */}
        <label className="block ">
          First Name
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="First Name"
            type="text"
            defaultValue={user ? user.firstName : ''}
            readOnly
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('First name')}

        {/* //@@ Last Name */}
        <label className="block ">
          Last Name
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="Last Name"
            type="text"
            readOnly
            defaultValue={user ? user.lastName : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Last Name')}

        {/* //@@ Job title */}
        <label className="block ">
          Job Title
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="job_title"
            type="text"
            readOnly
            defaultValue={user ? user.jobTitle : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Job Title')}

        {/* //@@ DEPARTMENT */}
        <label className="block mt-3">
          Your Department
          <select
            data-role="profileSetting"
            data-defaultvalue={user ? user.department : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="department"
            disabled
            defaultValue={user ? user.department : ''}
            ref={register({ required: true })}
          >
            <option value="Executive">Executive Branch</option>
            <option value="Executive">External Affairs Branch</option>
            <option value="Preparedness">Preparedness Branch</option>
            <option value="SupportServices">Support Services Branch</option>
            <option value="HumanResources">Human Resources Branch</option>
            <option value="Maintenance">Maintenance Branch</option>
            <option value="FieldServices">Field Services Branch</option>
            <option value="ExternalAffairs">External Affairs</option>
            <option value="Logistics">Logistics Branch</option>
            <option value="Operations">Operations</option>
            <option value="Recovery">Recovery Branch</option>
            <option value="Mitigation">Mitigation Branch</option>
            <option value="InformationTechnology">
              Information Technology
            </option>
            <option value="Warehouse">Warehouse Branch</option>
          </select>
        </label>
        {ErrorMessage('Department')}

        {/* //@@ Location/ */}
        <label className="block mt-3">
          Your Location
          <select
            data-role="profileSetting"
            data-defaultvalue={user ? user.location : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="location"
            disabled
            defaultValue={user ? user.location : ''}
            ref={register({ required: true })}
          >
            <option value="Pearl">HQ(Pearl)</option>
            <option value="Warehouse">Warehouse(Byram)</option>
            <option value="BoltonBuilding">Bolton Building (Biloxi)</option>
          </select>
        </label>
        {ErrorMessage('Location')}

        {/* //@@ Phone */}
        <label className="block mt-3">
          Mobile Phone Number
          {/* //todo add validation here? */}
          <input
            data-role="profileSetting"
            name="phone"
            type="tel"
            readOnly
            defaultValue={user ? user.phone : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Mobile')}

        {/* //@@ Phone */}
        <label className="block mt-3">
          Office Phone Number
          {/* //todo add validation here? */}
          <input
            data-role="profileSetting"
            name="phone"
            type="tel"
            readOnly
            defaultValue={user ? user.phone : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            ref={register()}
          />
        </label>
        {ErrorMessage('Office')}

        {/* errors will return when field validation fails  */}

        <button
          className={` mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
            isEditing ? 'hidden' : 'block'
          }`}
          onClick={(event) => {
            handleProfileEdits(event, 'START_UPDATES');
          }}
        >
          Edit
        </button>
        <button
          className={`mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
            isEditing ? 'block' : 'hidden'
          }`}
          onClick={(event) => {
            handleProfileEdits(event, 'CANCEL_UPDATES');
          }}
        >
          Cancel Edits
        </button>
        <input
          className={`mt-3 px-2 py-1 font-bold rounded-md hover:bg-green-900 hover:text-white  bg-gray-200 mx-auto text-black ${
            isEditing ? 'block' : 'hidden'
          }`}
          name="Submit"
          type="submit"
        />
      </div>
    </form>
  );
}
