import React from 'react';
import {Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Usuarios from './pages/admin/Usuarios'
import NotFound from './components/404/NotFound.js';
import Navbar from './components/Navbar';
import {Box} from "@chakra-ui/core";
const Router = () => (
  <>
  <Navbar />
  <Box marginTop="10vh"/>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/usuarios" component={Usuarios} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default Router;
