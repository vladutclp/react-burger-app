import React from 'react';
import classes from './App.module.css';
import Layout from './components/Layout/Layout.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder.js';
function App() {
  return (
    <div className={classes.App}>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
