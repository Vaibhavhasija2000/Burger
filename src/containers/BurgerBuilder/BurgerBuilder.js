import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIANT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7

}
class BurgerBuilder extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state - {...};
    // }
    state = {
        ingrediants: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    } 

    updatePurchase(ingrediants) {
       
        const sum= Object.keys(ingrediants)
        .map(igKey =>{
            return ingrediants[igKey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        this.setState({purchasable:sum>0})
    }
    addIngrediantHandler = (type) => {
        const oldCount = this.state.ingrediants[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        };
        updatedIngrediants[type] = updatedCount;
        const priceAddition = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice,ingrediants: updatedIngrediants})
        this.updatePurchase(updatedIngrediants);
    }

    removeIngrediantHandler =(type) => {
        const oldCount = this.state.ingrediants[type];
        if(oldCount <=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngrediants = {
            ...this.state.ingrediants
        };
        updatedIngrediants[type] = updatedCount;
        const priceDeduction = INGREDIANT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice,ingrediants: updatedIngrediants})
        this.updatePurchase(updatedIngrediants);
    }
    purchaseHandler= () =>{
        this.setState({purchasing:true});

    }
    purchaseCancelHandler =() =>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler =() => {
       // alert('you continue');
    //    this.setState({loading: true});
    //    const order = {
    //        ingrediants: this.state.ingrediants,
    //        price: this.state.totalPrice,
    //        customer: {
    //            name: 'Max',
    //            addresss: {
    //                street: 'Teststreet 1',
    //                zipCode: '41351',
    //                country: 'Germany'
    //            },
    //            email: 'test@test.com'
    //        },
    //        deliveryMethod: 'fastest'
    //    }
    //    axios.post('/orders.json',order)
    //    .then(response => {
    //        this.setState({loading: false, purchasing: false});
    //    }
           
    //    )
    //    .catch(error => {
    //        this.setState({loading: false, pusrchasing: false});
    //    });
    const queryParams =[   ];
    for(let i in this.state.ingrediants){
        queryParams.push(encodeURIComponent(i) + '='+ encodeURIComponent(this.state.ingrediants[i]));

    }
    const queryString =queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
    });
    }
    render(){
        const disabledInfo ={
            ...this.state.ingrediants
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary =  <OrderSummary 
        ingrediants= {this.state.ingrediants}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>;

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Auxiliary>

                <Modal show={this.state.purchasing} ModalClosed = {this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                <Burger ingrediants={this.state.ingrediants} />
                <BuildControls 
                ingrediantAdded ={this.addIngrediantHandler}
                
                ingrediantRemoved = {this.removeIngrediantHandler} 
                
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}/>
            </Auxiliary>
    
        );
    }
}
export default withErrorHandler(BurgerBuilder,axios);