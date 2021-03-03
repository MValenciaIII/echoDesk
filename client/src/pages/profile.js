import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
// import getDbUser from '../auth/getDbUser';
import { UserContext } from '../context/dbUserContext';
// import Select from 'react-select';  //? NOT going to use I think; hard to use in conjuction with REACT hook form to me;  WK 3/3/21
import { WarningIcon } from '../components/Icons';
import {
  departmentWordToValue,
  locationWordToValue,
} from '../utils/sqlFormHelpers';

import Loading from '../components/Loading';

export default function ProfileSetttings() {
  //   user return from useAuth
  const { user } = useAuth0();

  //grab sql user from context;  Context updates mysqlUser when auth0 user changes in useEffect dependency array
  let { mysqlUser, getDbUser } = useContext(UserContext);
  debugger;

  // let [departmentName, setDepartmentName] = useState(
  //   departmentProfileNamesHelper(mysqlUser.department)
  // );

  console.log(mysqlUser);
  // console.log(Object.entries(mysqlUser || ''));

  const [isEditing, setisEditing] = useState(false);
  const [formFieldOriginalState, setFormFieldOriginalState] = useState(null);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    getDbUser(user.sub);
  }, [user]);

  //   ?@@ SAMPLE USER HERE TO AVOID AUTH API
  //   const mysqluser = {
  //   id: "auth0|90029387987"
  //     fname: 'Will',
  //     lname: 'Kelly',
  //     email: 'wkelly@mema.ms.gov',
  //     mobile_phone: 'Warehouse',
  //     phone: '555-555-5555',
  //   };
  //   default values from this package explained here:
  // https://react-hook-form.com/api/

  //   todo: onSubmit should patch to our DATABASE TO UPDATE USER INFO WHICH WILL THEN BE CALLED TO GET TICKETS FOR THAT USER;  Or update meta in auth0?
  function onSubmit(data, event) {
    event.preventDefault();
    console.log(data);
    debugger;

    data.department_id = departmentWordToValue(data.department_id);
    data.location_id = locationWordToValue(data.location_id);

    // let valueToSubmit2 = { ...data, id: 'auth0|603d06a199dbeb0068b68f69' };

    // Posting new Users
    if (!mysqlUser.fname) {
      let valueToSubmit = { ...data, id: user.sub };
      fetch('http://10.195.103.107:3075/api/users/create', {
        method: 'POST', //POST And PUT are the http methods. Usually we use GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valueToSubmit),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((error) => console.log({ error }));
    }
    // PATCHING EXISTING USERS
    else {
      let valueToSubmit = { ...data };
      fetch(`http://10.195.103.107:3075/api/users/update/${mysqlUser.id}`, {
        method: 'POST', //PUT UPDATES THE ENTIRE RECORD; PATCH A PARTIAL UPDATE
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(valueToSubmit),
      })
        .then((response) => response.json())
        .then((message) => console.log(message))
        .catch((error) => console.log({ error }));
    }
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

  // function defaultValues(key) {

  //   if (!mysqlUser[key]) {
  //     return '';
  //   } else {
  //     let entries = Object.entries(mysqlUser);
  //     let selected = entries.find((entry) => {
  //       return entry[0] === key;
  //     });
  //     return {
  //       label: selected[0],
  //       value: selected[1],
  //     };
  //   }
  // }

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

  if (!mysqlUser) {
    return <Loading />;
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
        <label className="block mt-3  ">
          First Name
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="fname"
            type="text"
            defaultValue={mysqlUser ? mysqlUser.fname : ''}
            readOnly={isEditing ? false : true}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('First name')}

        {/* //@@ Last Name */}
        <label className="block mt-3  ">
          Last Name
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="lname"
            type="text"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.lname : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Last Name')}

        {/* //@@ Job title */}
        <label className="block mt-3  ">
          Job Title
          <input
            data-role="profileSetting"
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="title"
            type="text"
            readOnly={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.title : ''}
            ref={register({ required: true })}
          />
        </label>
        {ErrorMessage('Job Title')}

        {/* //@@EMAIL */}
        <label className="block mt-3  ">
          Email
          <input
            data-role="profileSetting"
            data-defaultvalue={mysqlUser ? mysqlUser.email : ''}
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="department_id"
            disabled={isEditing ? false : true}
            defaultValue={mysqlUser ? mysqlUser.department : ''}
            ref={register({ required: true })}
          >
            <option value="Executive Branch">Executive Branch</option>
            <option value="Preparedness Branch">Preparedness Branch</option>
            <option value="Mitigation Branch">Mitigation Branch</option>
            <option value="Warehouse Branch">Warehouse Branch</option>
            <option value="Support Services Branch">
              Support Services Branch
            </option>
            <option value="Human Resources Branch">
              Human Resources Branch
            </option>
            <option value="Maintenance Branch">Maintenance Branch</option>
            <option value="Recovery Branch">Recovery Branch</option>
            <option value="Field Services Branch">Field Services Branch</option>
            <option value="External Affairs Branch">
              External Affairs Branch
            </option>
            <option value="Logistics Branch">Logistics Branch</option>
            <option value="Operations Branch">Operations Branch</option>
            <option value="Individual Assistance">Individual Assistance</option>
            <option value="Information Technology">
              Information Technology
            </option>
          </select>
        </label>
        {ErrorMessage('Department')}

        {/* //@@ Location/ */}
        <label className="block mt-3">
          Your Location
          <select
            data-role="profileSetting"
            data-defaultvalue={mysqlUser.location}
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
            name="location_id"
            disabled={isEditing ? false : true}
            defaultValue={mysqlUser.location}
            ref={register({ required: true })}
          >
            <option value="HQ(Pearl)">HQ(Pearl)</option>
            <option value="Warehouse(Byram)">Warehouse(Byram)</option>
            <option value="Bolton Building (Biloxi)">
              Bolton Building (Biloxi)
            </option>
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
            className="block w-52 lg:w-72 text-black px-2 py-1 rounded"
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
