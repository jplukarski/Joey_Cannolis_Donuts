import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from "../Auth";
import {CartContext} from '../Cart'
import app from '../base'

export default function Menubar() {
    const { currentUser } = useContext(AuthContext);
    const { CartState } = useContext(CartContext);

    return(
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">Joey Cannoli's Donuts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/donuts">Donuts</Nav.Link>
                        <Nav.Link href="/cannolis">Cannolis</Nav.Link>
                    </Nav>
                    <Nav>
                        {!currentUser ? <Nav.Link href="/authenticate">Register / Login</Nav.Link> : <Nav.Link onClick={() => app.auth().signOut()}>Hello, {currentUser.email} | Sign Out</Nav.Link>}
                        <Nav.Link href="/cart">Cart ({CartState.cart.length})</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}