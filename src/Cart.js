import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from './Auth'
import app from './base.js'

export const CartContext = React.createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);
    const CartState = { cart, setCart}
    const { currentUser } = useContext(AuthContext);

    if(!localStorage.getItem('sessionID')){
        localStorage.setItem("sessionID", Math.floor((Math.random() * 100000) + 1))
    }

    useEffect(() => {
        if(currentUser){
            app
                .firestore()
                .collection(currentUser.uid)
                .onSnapshot((snapshot) => {
                    const newCart = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
    
                    setCart(newCart)
                })
        } else {
            app
                .firestore()
                .collection(localStorage.getItem('sessionID'))
                .onSnapshot((snapshot) => {
                    const newCart = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }))
    
                    setCart(newCart)
                })
        }
    } ,[currentUser])

    return(
        <CartContext.Provider
            value={{CartState}}
        >
            {children}
        </CartContext.Provider>
    )
}