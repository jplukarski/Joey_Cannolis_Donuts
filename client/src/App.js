import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Failure from './pages/Failure'
import Navbar from './components/Navbar'

export default function App(){
    return(
        <>
            <Navbar/>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/logout' component={Logout}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/cart' component={Cart}/>
                    <Route exact path='/cart/success' component={Success}/>
                    <Route exact path='/cart/failure' component={Failure}/>
                </Switch>
            </Router>
        </>
    )
}