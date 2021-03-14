import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { WarningIcon } from '../components/Icons';
import { UserContext } from '../context/dbUserContext';

//? This is an NPM package that makes some nice select elements, but they are controlled components vs React Hook FORMS uncontrolled.  The CAN be integrated, but it takes a touch of extra work;  Maybe somewhere down the line could look into refactoring to use with react-hook-forms;   For now, NOT going to use for mvp;  WK 3/3/21
// import Select from 'react-select';

export default function ProfileSetttings({ userSub, setmysqlUser, mysqlUser }) {
  //state to determine editing form fields or not
  const [isEditing, setisEditing] = useState(false);

  const { auth0UserMeta, getAuth0UserMeta } = useContext(UserContext);

  // Likely I've done this the hard way here;  Pretty sure react hook form has a simple reset function that I could have used, but I didn't thoroughly read the docs at the time.  ~wk 3-15;
  //todo: refactor later after mvp to see about simplyfying reset logic;
  const [formFieldOriginalState, setFormFieldOriginalState] = useState(null); //null is the default values obj; Currently being defined on the form fields themselves;

  //Hook form methods
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (!auth0UserMeta)
      getAuth0UserMeta(userSub)
        .then((values) => console.log(values))
        .catch((err) => console.warn(err));
  }, []);
  console.log(auth0UserMeta);

  //TODO:ADD VALIDATION
  async function onSubmit(data, event) {
    debugger;
    event.preventDefault();

    // adding the id from auth0;  passed in from props whose parent is a page;
    data.id = userSub; //passed in through props;  It's auth0 sub minus the auth0| that comes on it; Just the number

    // 1 = admin; 0 = normal client
    data.isAdmin = auth0UserMeta.app_metadata?.isAdmin ? true : false;

    // Posting new Users
    if (!mysqlUser.fname) {
      try {
        let valueToSubmit = { ...data };
        let response = await fetch(
          'http://10.195.103.107:3075/api/users/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueToSubmit),
          }
        );
        let result = await response.json();
        console.log(result);
        await setmysqlUser(valueToSubmit);
        if (auth0UserMeta.app_metadata?.isAdmin) {
          try {
            // todo: see about putting more agent meta in;
            let agentData = {
              client_id: userSub,
              id: auth0UserMeta.app_metadata?.agent_id,
            };
            let agentResponse = await fetch(
              'http://10.195.103.107:3075/api/agents/create',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(agentData),
              }
            );
            let agentResult = await agentResponse.json();
            console.log(agentResult);
          } catch (error) {
            console.warn({ error });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
    // PATCHING EXISTING USERS
    else {
      try {
        let valueToSubmit = { ...data };
        let response = await fetch(
          `http://10.195.103.107:3075/api/users/update/${userSub}}`,
          {
            method: 'POST', //PUT UPDATES THE ENTIRE RECORD; PATCH A PARTIAL UPDATE
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueToSubmit),
          }
        );
        let result = await response.json();
        console.log(result);
        await setmysqlUser(result);
      } catch (error) {
        console.error({ error });
      }
    }
    setisEditing(false);
  }

  // Error message and icon for form validation
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

  // todo: like above, see about refactoring using reset method from react hook form instead of this.  BUT it does work for now;   ~Wk 3-15
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
  // todo: possibly see about making these from reusable form components instead of the big monolithic structure we have here: ~wk 3-15
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
