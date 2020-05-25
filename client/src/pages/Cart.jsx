import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {CartContext} from '../Cart'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Cart() {
    const { CartState } = useContext(CartContext);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let totalFromCart = 0
        CartState.cart.forEach(item => totalFromCart = totalFromCart + parseFloat((item.price * 100)))
        // CartState.cart.forEach(item => console.log(item.price))

        setTotal(totalFromCart)
    }, [CartState])
    return(
        <>
            <Container>
                <Row style={{borderStyle: "solid", marginTop: '25px'}}>
                    <span><h1>Total: ${total / 100}</h1></span>



                    {CartState.cart.map(item => 
                        <Card style={{width: "100%"}}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>Number of items: {item.count} <Button variant="secondary" size='sm'>+</Button><Button variant="secondary" size='sm'>-</Button></Card.Text>
                            <Card.Text>Total: ${item.price}</Card.Text>

                            <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    )}

                </Row>
            </Container>
        </>
    )
}