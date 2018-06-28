import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingKey => {
            return (<li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}: {this.props.ingredients[ingKey]}</span>
                    </li>)
        });
        return (
            <Aux>
                <h3>Your order</h3>
                <p>You burger with the following:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType="Danger" clicked={this.props.purcahseCanceled}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;