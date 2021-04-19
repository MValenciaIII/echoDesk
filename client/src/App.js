import React from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './auth/protected-route';
import ClientDashboard from './pages/clientHome';
import AgentHome from './pages/agentHome';
import ProfileSettings from './pages/profile';
import AgentInputTicket from './pages/agentInputTicket.js';
import Loading from './components/Loading';
// import FilesUploadComponent from './components/Images';
// import Ticket from './components/Ticket';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div id="App" className="flex flex-col min-h-screen">
      <Switch>
        <ProtectedRoute path="/profilesettings" component={ProfileSettings} />
        <ProtectedRoute path="/agentHome" component={AgentHome} />
        <ProtectedRoute path="/agentInputTicket" component={AgentInputTicket} />
        <ProtectedRoute exact path="/" component={ClientDashboard} />
      </Switch>
      {/* <FilesUploadComponent /> */}
    </div>
  );
}
export default App;
