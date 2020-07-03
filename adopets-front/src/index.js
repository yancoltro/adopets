import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/User/Login'
import Register from './components/User/Register'
import ProductsList from './components/Products/ProductsList'
import {isLoggedIn, Logout} from './components/Defaults'

import App from './App';
import ComponenteDePagina404 from './App';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/products" render={() => (
          isLoggedIn() ? (
            <ProductsList />
          ) : (
            <Redirect to="/login" />
            )
        )} />
        <Route path='/logout' component={Logout} />
        <Route path='*' component={ComponenteDePagina404} />

      </Switch>
    </ BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
