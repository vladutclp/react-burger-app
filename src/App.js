import React from 'react';
import classes from './App.module.css';
import Layout from './components/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
import Checkout from './containers/Checkout/Checkout.js';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
