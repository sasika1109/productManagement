import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

// use bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// COMPONENTS //
//Main
import MainPage from './components/MainPage/MainPage';
// auth 
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// products
import Product from './components/product/Product';
import AddProduct from './components/product/AddProduct';
import EditProduct from './components/product/EditProduct';
import SingleProduct from './components/product/SingleProduct';

// default
import Default from './components/Default';

function App() {

  let isLoggedIn = false;

  const token = localStorage.getItem('token');

  if (token) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  return (
    <React.Fragment>
      <Switch >
        <Route exact path="/" component={MainPage} />
        {isLoggedIn &&<Route exact path="/products" component={Product} />}
        {isLoggedIn &&<Route exact path="/addProduct" component={AddProduct} />}
        {isLoggedIn &&<Route exact path="/product/edit/:id" component={EditProduct} />}
        <Route exact path="/product/view/:id" component={SingleProduct} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={Default} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
