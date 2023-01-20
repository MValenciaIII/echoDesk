import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from '../components/Loading';
import { UserContext } from '../context/dbUserContext';
import HeaderFooter from '../containers/HeaderFooter';
import AgentCreateFormContainer from '../containers/AgentCreateContainer';


function AgentCreateBoard(props) {




    return (
        <HeaderFooter>
            <AgentCreateFormContainer />
        </HeaderFooter>
    );
}

export default AgentCreateBoard;