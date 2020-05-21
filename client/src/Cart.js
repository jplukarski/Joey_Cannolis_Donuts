import React, { useState} from 'react';

export const CartContext = React.createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([
        {
            "image":"",
            "title":"",
            "price":0,
            "count":0
        }
    ]);
    const CartState = { cart, setCart}

    return(
        <CartContext.Provider
            value={{CartState}}
        >
            {children}
        </CartContext.Provider>
    )
}