import React, {useContext } from 'react';
import { UserContext } from '../context/dbUserContext';
import { yupResolver } from '@hookform/resolvers/yup';
import AgentCreateForm from '../components/AgentCreateForm'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { profileSchema } from '../constants/formValidationSchemas';
import {
    createUserRoute,
    updateUserRoute,
    createAgentRoute,
  } from '../constants/apiRoutes';

  export default function AgentCreateFormContainer ({
      children,
  }) {


    return (
        <div
        id="CreateAdminFormContainer"
        className="flex-grow w-full p-8 bg-base "
      >
          <AgentCreateForm>
              
          </AgentCreateForm>
      </div>
    )
  }