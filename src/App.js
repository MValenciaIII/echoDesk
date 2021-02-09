import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div id="App">
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}
export default App;
