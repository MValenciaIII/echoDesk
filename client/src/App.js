import React from 'react';
import { Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from './auth/protected-route';
import ClientDashboard from './pages/clientHome';
import AgentHome from './pages/agentHome';
import ProfileSettings from './pages/profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
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
        <ProtectedRoute exact path="/" component={ClientDashboard} />
      </Switch>
    </div>
  );
}
export default App;
