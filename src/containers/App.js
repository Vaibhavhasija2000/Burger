import React, {Component } from 'react';

import Layout from '../Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import { Route, Switch } from 'react-router-dom';
import Checkout from './Checkout/Checkout';
class App extends Component {
  
  
  render() {
    return(
    <div>
     <Layout>
       <Switch>
      <Route path="/checkout" component ={Checkout} />
      <Route path="/" exact component ={BurgerBuilder} />
      </Switch>
     </Layout>
     
    </div>
    );
  }
}
export default App;