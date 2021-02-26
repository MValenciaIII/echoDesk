import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ClientDashboard from './pages/clientHome';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
// import Ticket from './components/Ticket';
import ProfileSettings from './components/ProfileSettings.jsx';

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div id="App" className="flex flex-col min-h-screen">
      <Header />
      <Switch>
        <Route exact path="/" component={ClientDashboard} />
        <Route path="/profilesettings" component={ProfileSettings} />
      </Switch>
      <Footer />
    </div>
  );
}
export default App;
