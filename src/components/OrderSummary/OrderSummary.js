import React from 'react';

import Aux from '../../hoc/Aux';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingKey => {
            return (<li key={ingKey}>
                        <span style={{textTransform: 'capitalize'}}>{ingKey}: {props.ingredients[ingKey]}</span>
                    </li>)
        });
    return (
        <Aux>
            <h3>Your order</h3>
            <p>You burger with the following:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to checkout</p>
        </Aux>
    );
};

export default orderSummary;