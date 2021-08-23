import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LoginPage, RegistrationPage, DashboardPage, TempView } from './pages/';

import { Header, Navigation, Currency } from './components'
import DiagramTab from './components/DiagramTab'

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />

      <Switch>
        <Route path={'/'} exact component={DashboardPage} />
        <Route path={'/home'} exact component={DashboardPage} />
        <Route path={'/diagram'} exact component={DiagramTab} />
        <Route path={'/currency'} exact component={Currency} />
        <Route path={'/login'} exact component={LoginPage} />
        <Route path={'/register'} exact component={RegistrationPage} />
      </Switch>

    </div>
  );
}

export default App;
