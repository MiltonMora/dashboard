import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Layout from '../components/Layout';
import SignIn from '../containers/SignIn';
import Home from '../containers/Home';
import Users from '../containers/Users';
import Courses from '../containers/Courses';

import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';

const App = () => {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Layout>
            <Route exact path="/home" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/courses" component={Courses} />
          </Layout>
        </Switch>
    </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
