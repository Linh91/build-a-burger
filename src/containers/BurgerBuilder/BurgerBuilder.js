import React, { Component } from 'react';

import axios from '../../axios-orders';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients) //(4) ["salad", "bacon", "cheese", "meat"]
            .map(ingKey => {
                return ingredients[ingKey]; //(4) [2, 0, 0, 0] value of type
            })
            .reduce((sum, el) => { // 0, 2
                return sum + el;
            }, 0); //starting number of zero 
        this.setState({purchasable: sum > 0});
        }

    addIngdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients); // take the newly updated state not the old one like before
        console.log('sum2', this.state.ingredients);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Same',
                address: {
                    street: 'Haygate',
                    postcode: 'SE5 0NW',
                    country: 'Germany'
                },
                email: 'test@testing.com'
            },
            deliveryMethod: 'asap'
        }
        axios.post('/orders.json', order) // first arg firebase path, second arg the order above
            .then(response => {
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            });
    }

    removeIngredientHandler = (type) => {
        console.log('remove clicked');
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            purcahseCanceled={this.purchaseCancelHandler}
                            purchaseContinue={this.purchaseContinueHandler}
                            price={this.state.totalPrice}/>;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngdientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;