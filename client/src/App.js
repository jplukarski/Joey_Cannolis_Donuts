import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Home from './pages/Home'
import Authenticate from './pages/Authenticate'
import Cart from './pages/Cart'
import Donuts from './pages/Donuts'
import Success from './pages/Success'
import Failure from './pages/Failure'
import Cannolis from './pages/Cannolis'
import Header from './components/Navbar'
import {AuthProvider} from './Auth';
import {CartProvider} from './Cart';
// import Footer from './components/Footer'

// import app from './base.js'

// app.firestore().collection('cart').add({
//     image:"my butt",
//     title:"my hairy butt",
//     price:1000000,
//     count:1
// })

export default function App(){
    return(
        <>
            <AuthProvider>
                <CartProvider>
                    <Header />
                    <Router>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/authenticate' component={Authenticate}/>
                            <Route exact path='/cart' component={Cart}/>
                            <Route exact path='/cart/success' component={Success}/>
                            <Route exact path='/cart/failure' component={Failure}/>
                            <Route exact path='/donuts' component={Donuts}/>
                            <Route exact path='/cannolis' component={Cannolis}/>
                        </Switch>
                    </Router>
                    {/* <Footer/> */}
                </CartProvider>
            </AuthProvider>
        </>
    )
}