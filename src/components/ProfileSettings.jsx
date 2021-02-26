import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

import useUserMetadata from '../hooks/useGetUserMeta';
import { WarningIcon } from './Icons';

export default function ProfileSetttings() {
  //   const { user_metadata } = useUserMetadata();

  //   user return from useAuth
  const { user } = useAuth0();
  debugger;
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
  const { register, handleSubmit, watch, errors } = useForm();

  const [isEditing, setisEditing] = useState(false);
  const [readOnlyFields, setreadOnlyFields] = useState(null);

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER
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
      setreadOnlyFields(fieldsToEdit);
      fieldsToEdit.forEach((field) => {
        field.readOnly = false;
        field.disabled = false;
      });
    } else if (action === 'CANCEL_UPDATES') {
      for (let i = 0; i < readOnlyFields.length; i++) {
        debugger;
        const field = readOnlyFields[i];
        field.value = field.defaultValue || field.dataset.defaultvalue; //for select elements that don't have a default value; lower case for dataset
        readOnlyFields.forEach((field) => {
          field.readOnly = true;
          field.disabled = true;
        });
      }
      console.log('saving profile Edits!');
    }
  }

  function defaultValues(prop) {
    if (prop) {
      return prop;
    } else return '';
  }

  return (
    <>
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
          {ErrorMessage('fullName')}

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
              <option value="Executive">Executive</option>
              <option value="Preparedness">Preparedness</option>
              <option value="SupportServices">Support Services</option>
              <option value="HumanResources">Human Resources</option>
              <option value="Maintenance">Maintenance</option>
              <option value="FieldServices">Field Services</option>
              <option value="ExternalAffairs">External Affairs</option>
              <option value="Logistics">Logistics</option>
              <option value="Operations">Operations</option>
              <option value="InformationTechnology">
                Information Technology
              </option>
            </select>
          </label>

          {/* //@@ Location/ */}
          <label className="block mt-3">
            Your Average Location
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

          {/* //@@ Phone */}
          <label className="block mt-3">
            Phone Number
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
    </>
  );
}
