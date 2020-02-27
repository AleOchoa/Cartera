import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/admin/Usuarios'
import NotFound from './components/404/NotFound.js';
import Navbar from './components/Navbar';

const Router = () => (
  <>
  <Navbar />
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/usuarios" component={Usuarios} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Router;
