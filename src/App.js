import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ClientLoginPage from './pages/ClientLogin.js';
import ClientDashboard from './pages/clientHome';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Ticket from './components/Ticket';
import AgentLogin from './components/AgentLogin';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
// import Ticket from './components/Ticket';
import TicketsContainer from './containers/TicketsContainer';
import ProfileSetttings from './components/ProfileSettings.jsx';

function App() {
  return (
    <div id="App" className="flex flex-col min-h-screen">
      <Header />
      <Switch>
        {/* <Route exact path="/" component={ClientLoginPage} /> */}
        <Route path="/login" component={Login} />
        <Route exact path="/" component={ClientDashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/agent" component={AgentLogin} />
        <Route path="/ticket" component={Ticket} />
        <Route path="/profilesettings" component={ProfileSetttings} />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
