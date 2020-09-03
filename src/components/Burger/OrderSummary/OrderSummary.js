import React,{ Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }
    render() {
        
    const ingrediantSummary = Object.keys(this.props.ingrediants)
    .map(igKey => {
        return(<li key ={igKey}>
            
            <span style= {{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingrediants[igKey]}</li> );
    });


    return(
        <Auxiliary>
            <h3> Your Order</h3>
            
        <p> A delicious burger with the following ingrediants:</p>
        <ul>
          {ingrediantSummary}
        </ul>
    <p><strong>Total Price:{this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType = 'Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType = 'Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary>
    );

    }
}

export default OrderSummary;