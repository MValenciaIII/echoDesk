import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';

import useUserMetadata from '../auth/getUserMeta';
import { WarningIcon } from '../components/Icons';

export default function ProfileSetttings() {
  //   const { user_metadata } = useUserMetadata();
  let [mysqlUser, setmysqlUser] = useState(null);

  // useEffect(() => {
  //   async function sqlDbCall() {
  //     let  apiRoute = `http://10.195.103.107:3075/api/users/${user.sub}`
  //     let response = await fetch(apiRoute);
  //     let sqlUser = await response.json();
  //     setmysqlUser(mysqlUser)
  //   }
  // } , [user])

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
  const { register, handleSubmit, errors, getValues } = useForm();

  const [isEditing, setisEditing] = useState(false);
  const [formFieldOriginalState, setFormFieldOriginalState] = useState(null);

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER;  Or update meta in auth0?
  function onSubmit(data, event) {
    event.preventDefault();
    console.log(data);
    let values = getValues();
    console.log(values);

    let valueToSubmit = { ...data, id: user.sub };
    console.log(valueToSubmit);

    // todo: POST IF NEW (IE; DON'T ALREADY HAVE THIS INFO;  PATCH IF INFO ALREADY PRESENT)
    // let apimethod = user.fname ? "PATCH" : 'POST'

    fetch('http://10.195.103.107:3075/api/users/create', {
      method: 'POST', //POST And PUT are the http methods. Usually we use GET
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
            name="fname"
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
            name="lname"
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
            name="title"
            type="text"
            readOnly
            defaultValue={user ? user.jobTitle : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Job Title')}

        {/* //@@EMAIL */}
        <label className="block ">
          Email
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="email"
            type="text"
            readOnly
            defaultValue={user ? user.email : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Email')}

        {/* //@@ DEPARTMENT */}
        <label className="block mt-3">
          Your Department
          <select
            data-role="profileSetting"
            data-defaultvalue={user ? user.department : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            name="department_id"
            disabled
            defaultValue={user ? user.department : ''}
            ref={register({ required: true })}
          >
            <option value="1">Executive Branch</option>
            <option value="2">Preparedness Branch</option>
            <option value="3">Mitigation Branch</option>
            <option value="4">Warehouse Branch</option>
            <option value="5">Support Services Branch</option>
            <option value="6">Human Resources Branch</option>
            <option value="7">Maintenance Branch</option>
            <option value="8">Recovery Branch</option>
            <option value="9">Field Services Branch</option>
            <option value="10">External Affairs Branch</option>
            <option value="11">Logistics Branch</option>
            <option value="12">Operations Branch</option>
            <option value="13">Individual Assistance</option>
            <option value="14">Information Technology</option>
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
            readOnly
            defaultValue={user ? user.phone : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
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
            readOnly
            defaultValue={user ? user.phone : ''}
            className="block w-52 lg:w-72 text-black py-0.5 px-1"
            ref={register({})}
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
