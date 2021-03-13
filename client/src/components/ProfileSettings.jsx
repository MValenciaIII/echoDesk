import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { UserContext } from '../context/dbUserContext';
// import Select from 'react-select';  //? NOT going to use I think; hard to use in conjuction with REACT hook form to me;  WK 3/3/21
import { WarningIcon } from '../components/Icons';
import { locationIdToWord, departmentIdToValue } from '../utils/sqlFormHelpers';
import UseAuth0UserMeta from '../auth/useAuth0UserMeta';

export default function ProfileSetttings({
  userSub,
  setmysqlUser,
  mysqlUser,
  auth0UserMeta,
  getAuth0UserMeta,
}) {
  //grab sql user from context;  Context updates mysqlUser when auth0 user changes in useEffect dependency array

  console.log({ mysqlUser }); //should never return undefined since parent container PROFILE PAGE will fetch user from auth0 and then set it to context first;

  const [isEditing, setisEditing] = useState(false);
  const [formFieldOriginalState, setFormFieldOriginalState] = useState(null);

  const { register, handleSubmit, errors, reset } = useForm();

  // useEffect(() => {
  //   if (!auth0UserMeta) {
  //     getAuth0UserMeta();
  //   }
  // });

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER;  Or update meta in auth0?
  //TODO:ADD VALIDATION
  async function onSubmit(data, event) {
    event.preventDefault();

    // todo: NEED AUTH HOOK TO CHECK THIS DATA:
    // if auth0UserMeta.app_metadata.admin {
    // data.agent_group = auth0UserMeta.app_metadata.agent_group;
    // POST TO AN ADDITIONAL AGENTS TABLE;
    // }

    console.log(data);
    data.id = userSub;

    // let valueToSubmit2 = { ...data, id: 'auth0|603d06a199dbeb0068b68f69' };
    debugger;
    // Posting new Users
    if (!mysqlUser.fname) {
      let valueToSubmit = { ...data };
      await fetch('http://10.195.103.107:3075/api/users/create', {
        method: 'POST', //POST And PUT are the http methods. Usually we use GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valueToSubmit),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .then(() => setmysqlUser(data))
        .catch((error) => console.log({ error }));
    }
    // PATCHING EXISTING USERS
    else {
      let valueToSubmit = { ...data };
      fetch(`http://10.195.103.107:3075/api/users/update/${userSub}}`, {
        method: 'POST', //PUT UPDATES THE ENTIRE RECORD; PATCH A PARTIAL UPDATE
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valueToSubmit),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .then(() => setmysqlUser(data))
        .then(() => reset())
        .catch((error) => console.log({ error }));
    }
    setisEditing(false);
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

  function handleProfileEdits(event, action) {
    setisEditing(!isEditing);

    if (action === 'START_UPDATES') {
      let fieldsToEdit = [
        ...document.querySelectorAll('[data-role="profileSetting"]'),
      ];
      setFormFieldOriginalState(fieldsToEdit);
    } else if (action === 'CANCEL_UPDATES') {
      for (let i = 0; i < formFieldOriginalState.length; i++) {
        const field = formFieldOriginalState[i];
        field.value =
          field._wrapperState.initialValue ||
          field.dataset.defaultvalue ||
          null; //for select elements that don't have a default value; lower case for dataset
      }
    }
  }

  return (
    <form
      className="flex-grow w-full p-4 mx-auto bg-gray-800"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* register your input into the hook by invoking the "register" function */}
      <h2 className="mx-auto mb-2 text-2xl font-bold text-white max-w-max">
        Update your profile settings
      </h2>
      <div
        id="formInputsContainer"
        className="p-8 mx-auto text-white bg-gray-700 rounded-lg max-w-max sm:max-w-lg"
      >
        {/* //@@ Full Name */}
        <label className="block mt-3 ">
          First Name
          <input
            data-role="profileSetting"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="fname"
            type="text"
            defaultValue={mysqlUser ? mysqlUser.fname : ''}
            readOnly={isEditing ? false : true}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('First name')}

        {/* //@@ Last Name */}
        <label className="block mt-3 ">
          Last Name
          <input
            data-role="profileSetting"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="lname"
            type="text"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.lname : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Last Name')}

        {/* //@@ Job title */}
        <label className="block mt-3 ">
          Job Title
          <input
            data-role="profileSetting"
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="title"
            type="text"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.title : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Job Title')}

        {/* //@@EMAIL */}
        <label className="block mt-3 ">
          Email
          <input
            data-role="profileSetting"
            data-defaultvalue={mysqlUser ? mysqlUser.email : ''}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="email"
            type="text"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.email : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Email')}

        {/* //@@ DEPARTMENT */}
        {/* <Controller /> */}
        <label className="block mt-3 ">
          Your Department
          <select
            data-role="profileSetting"
            data-defaultvalue={mysqlUser ? mysqlUser.department : ''}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="department_id"
            disabled={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.department : ''}
            ref={register({ required: true })}
          >
            <option value="1">Executive Branch </option>
            <option value="2">Preparedness Branch</option>
            <option value="3">Mitigation Branch</option>
            <option value="4">Warehouse Branch </option>
            <option value="5">Support Services Branch</option>
            <option value="6">Human Resources Branch </option>
            <option value="7">Maintenance Branch</option>
            <option value="8">Recovery Branch</option>
            <option value="9">Field Services Branch </option>
            <option value="10">External Affairs Branch</option>
            <option value="11">Logistics Branch</option>
            <option value="12">Operations Branch</option>
            <option value="13">Individual Assistance Branch</option>
            <option value="14">Information Technology Branch</option>
          </select>
        </label>
        {ErrorMessage('Department')}

        {/* //@@ Location/ */}
        <label className="block mt-3">
          Your Location
          <select
            data-role="profileSetting"
            data-defaultvalue={mysqlUser && mysqlUser.location}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            name="location_id"
            disabled={isEditing ? false : true}
            defaultValue={mysqlUser && mysqlUser.location}
            ref={register({ required: true })}
          >
            {/* todo:see about changing these back to number values; */}
            <option value="1">HQ(Pearl)</option>
            <option value="2">Warehouse(Byram)</option>
            <option value="3">Bolton Building (Biloxi)</option>
          </select>
        </label>
        {ErrorMessage('Location')}

        {/* //@@ Phone */}
        <label className="block mt-3">
          Mobile Phone Number
          {/* //todo add validation here? */}
          <input
            data-role="profileSetting"
            name="mobile_phone"
            type="tel"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.mobile_phone : ''}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Mobile Phone')}

        {/* //@@ Phone */}
        <label className="block mt-3">
          Office Phone Number
          {/* //todo add validation here? */}
          <input
            data-role="profileSetting"
            name="office_phone"
            type="tel"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.office_phone : ''}
            className="block px-2 py-1 text-black rounded w-52 lg:w-72"
            ref={register({})}
          />
        </label>
        {ErrorMessage('Office')}

        {/* errors will return when field validation fails  */}

        <button
          type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
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
          type="button" //!IMPORTANT; must have type = button, or otherwise the submit type is automatically given and runs the api call
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
