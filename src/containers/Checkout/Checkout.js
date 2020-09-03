import React,{ Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom';
import ContactData from '../../containers/Checkout/ContactData/ContactData';
class Checkout extends Component {
   state={
       ingrediants:{
           salad:1,
           meat:1,
           cheese:1,
           bacon:1

       }
   } 
   
   componentDidMount() {
       const query =new URLSearchParams(this.props.location.search);
       const ingrediants = {};
       for(let param of query.entries()) {
           ingrediants[param[0]] = +param[1];
       }
       this.setState({ingrediants:ingrediants});
   }
   checkoutCancelledHandler =() => {

    this.props.history.goBack();
   }
   checkoutContinuedHandler =() => {
       this.props.history.replace('/checkout/contact-data');

   }
   render() {
       return(
           <div>
               <CheckoutSummary 
               ingrediants={this.state.ingrediants}
               checkoutCancelled={this.checkoutCancelledHandler}
               checkoutContinued={this.checkoutContinuedHandler} />
               <Route path={this.props.match.path +'/contact-data'} component={ContactData}/>
           </div>

       );
   }

}

export default Checkout;