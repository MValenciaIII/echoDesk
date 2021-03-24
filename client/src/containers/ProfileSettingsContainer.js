// import React, { useContext } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { UserContext } from '../context/dbUserContext';
// import ProfileSettingsForm from '../components/InputTicketForm';
// import {
//   PrimaryServiceCategories,
//   // ThirdLevelServiceDetails,
//   DepartmentOptions,
//   LocationOptions,
//   PriorityOptions,
//   AgentOptions,
// } from '../utils/ticketCategories';

// // docs to package here; https://www.npmjs.com/package/react-toastify
// import { ToastContainer, toast, Zoom } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { profileSchema } from '../constants/formValidationSchemas';

// // docs to package here; https://www.npmjs.com/package/react-toastify

// export default function TicketFormContainer({ children, ...restProps }) {
//   const formClassname = 'flex-grow w-full p-4 mx-auto bg-gray-800';

//   const labelClassNames = 'block mt-3';

//   const inputClassNames = 'block p-1 rounded-sm text-black w-56 l lg:w-72';

//   const { mysqlUser, getDbUsersTickets } = useContext(UserContext);
//   console.log({ mysqlUser });

//   const defaultValues = {
//     fname: mysqlUser.fname || '',
//     lname: mysqlUser.lname || '',
//     title: mysqlUser.title || '',
//     email: mysqlUser.email || '',
//     department_id: mysqlUser.department || '',
//     location_id: mysqlUser.location_id || mysqlUser.location,
//     mobile_phone: mysqlUser.mobile_phone || '',
//     office_phone: mysqlUser.office_phone || '',
//   };

//   const resolver = yupResolver(profileSchema);

//   async function onSubmit(data, event) {
//     //todo: remove debugger before prod;
//     debugger;
//     event.preventDefault();

//     // adding the id from auth0;  passed in from props whose parent is a page;
//     data.id = userSub; //passed in through props;  It's auth0 sub minus the auth0| that comes on it; Just the number

//     // 1 = admin; 0 = normal client
//     if (auth0UserMeta) {
//       data.isAdmin = auth0UserMeta.app_metadata?.isAdmin ? true : false;
//     } else {
//       data.isAdmin = false;
//     }

//     // Posting new Users
//     if (!mysqlUser.fname) {
//       try {
//         let valueToSubmit = { ...data };
//         let response = await fetch(
//           'http://10.195.103.107:3075/api/users/create',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(valueToSubmit),
//           }
//         );
//         let result = await response.json();
//         console.log(result);
//         if (!result.error) {
//           await setmysqlUser(valueToSubmit);
//           console.log(mysqlUser);
//           toast.success('Profile Settings Created', {
//             position: 'top-right',
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }

//         if (auth0UserMeta.app_metadata?.isAdmin) {
//           // !CREATING AGENTS
//           try {
//             // todo: see about putting more agent meta in; doubtful for now
//             let agentData = valueToSubmit;
//             agentData.client_id = userSub;
//             agentData.id = auth0UserMeta.app_metadata?.agent_id;

//             let agentResponse = await fetch(
//               'http://10.195.103.107:3075/api/agents/create',
//               {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(agentData),
//               }
//             );
//             let agentResult = await agentResponse.json();
//             console.log({ agentResult });
//             if (!agentResult.error) {
//               await setmysqlUser(agentData);
//               toast.success('Agent Profile Settings Created', {
//                 position: 'top-right',
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//             }
//           } catch (error) {
//             console.warn({ error });
//           }
//         }
//       } catch (error) {
//         toast.error('Updating Profile Settings Failed', {
//           position: 'top-right',
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         console.error(error);
//       }
//     }
//     // PATCHING EXISTING USERS
//     else {
//       try {
//         let valueToSubmit = { ...data };
//         let response = await fetch(
//           `http://10.195.103.107:3075/api/users/update/${userSub}}`,
//           {
//             method: 'POST', //PUT UPDATES THE ENTIRE RECORD; PATCH A PARTIAL UPDATE
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(valueToSubmit),
//           }
//         );
//         let result = await response.json();
//         console.log(result);
//         if (!result.error) {
//           await setmysqlUser(valueToSubmit);
//           console.log(mysqlUser);
//           toast.success('Profile Settings Updated', {
//             position: 'top-right',
//             autoClose: 1000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       } catch (error) {
//         console.error({ error });
//         toast.error('Updating Profile Settings Failed', {
//           position: 'top-right',
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     }
//     setisEditing(false);
//   }
//   function showAssignAgentToAdmins() {
//     if (mysqlUser.isAdmin) {
//       return (
//         <ProfileSettingsForm.Select
//           options={<AgentOptions />}
//           name={'agent_id'}
//           label="Assign an Agent"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//       );
//     } else {
//       return null;
//     }
//   }

//   return (
//     <>
//       <ProfileSettingsForm
//         onSubmit={onSubmit}
//         classNames={formClassname}
//         defaultValues={defaultValues}
//         resolver={resolver}
//       >
//         <ProfileSettingsForm.Heading />
//         <ProfileSettingsForm.Input
//           name={'client_full_name'}
//           label="Full Name"
//           placeholder="Your name"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Select
//           options={<DepartmentOptions />}
//           name={'department_id'}
//           label="Department"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Select
//           options={<LocationOptions />}
//           name={'location_id'}
//           label="Location"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Input
//           name={'client_phone_number'}
//           label="Phone Number"
//           type={'tel'}
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Input
//           name={'email'}
//           label="Email"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Input
//           name={'subject'}
//           label="Subject"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />

//         <ProfileSettingsForm.Select
//           options={<PrimaryServiceCategories />}
//           name={'service_id'}
//           label="Service Type"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Select
//           options={<PrimaryServiceCategories />}
//           name={'service_details_id'}
//           useWatchOptions={true}
//           label="Service Details"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         <ProfileSettingsForm.Select
//           options={<PriorityOptions />}
//           name={'priority_id'}
//           label="Priority"
//           labelClassNames={labelClassNames}
//           inputClassNames={inputClassNames}
//         />
//         {showAssignAgentToAdmins()}
//         <ProfileSettingsForm.TextArea
//           label="Description"
//           name="description"
//           placeholder="Please write a short description here"
//           labelClassNames={labelClassNames}
//         />
//         <ProfileSettingsForm.Submit
//           type="submit"
//           value="Submit"
//           onClick={onSubmit}
//           classNames="block px-2 py-1 mx-auto mt-3 font-bold text-black bg-gray-200 rounded-md hover:bg-green-900 hover:text-white"
//         />
//       </ProfileSettingsForm>
//       <ToastContainer transition={Zoom} />
//     </>
//   );
// }
