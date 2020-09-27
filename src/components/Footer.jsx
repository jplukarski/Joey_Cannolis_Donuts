import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import React from 'react';

export default function Footer() {
    return (
        <Navbar expand="lg" variant="light" bg="light" fixed="bottom">
            <Container>
                <Navbar.Brand href="#">Joey Cannoli's Donuts</Navbar.Brand>
            </Container>
        </Navbar>
    )
}