import React, { Component, useContext } from 'react'
import {BrowserRouter as Router, Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { AuthContext } from "../Auth";
import app from '../base'


export default function Menubar() {
    const { currentUser } = useContext(AuthContext);

    return(
        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand href="/">Joey Cannoli's Donuts</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/donuts">Donuts</Nav.Link>
                        
                    </Nav>
                    <Nav>
                        {!currentUser ? <Nav.Link href="/authenticate">Register / Login</Nav.Link> : <Nav.Link onClick={() => app.auth().signOut()}> Signout</Nav.Link>}
                        <Nav.Link href="/cart">Cart</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}
