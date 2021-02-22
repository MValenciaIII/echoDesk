import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Ticket from './components/Ticket';
import AgentLogin from './components/AgentLogin';
import Home from './components/Home';
import Dashboard from './components/Dashboard'
import Header from './components/Header';
import Footer from './components/Footer';
// import Ticket from './components/Ticket';
import TicketsContainer from './containers/TicketsContainer';

function App() {
  return (
    <>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/agent" component={AgentLogin} />
          <Route path="/ticket" component={Ticket} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}
export default App;
