import React, {useContext, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {CartContext} from '../Cart'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { AuthContext } from "../Auth";
import app from '../base'

export default function Cart() {
    const { CartState } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let totalFromCart = 0
        CartState.cart.forEach(item => totalFromCart = totalFromCart + parseFloat((item.price * 100)))

        setTotal(totalFromCart)
    }, [CartState])

    const removeProduct = (item) => {
        if(currentUser){
            app
            .firestore()
            .collection(currentUser.uid)
            .doc(item.id)
            .delete()
            // console.log(item.id)
            // console.log(currentUser.uid)

        } else {
            console.log("not logged in")
        }
    }
    return(
        <>
            <Container style={{borderStyle: "solid", marginTop: '25px'}}>
                <Row>
                    <span><h1>Total: ${total / 100}</h1></span>
                    <Button variant="primary" href="/checkout">Continue to Checkout</Button>
                </Row>
                <Row>
                    {CartState.cart.map(item => 
                        <Card style={{width: "100%"}} key={item.id}>
                            <Card.Img variant="top" src={item.image} />
                            <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>Number of items: {item.count}</Card.Text>
                            <Card.Text>Total: ${item.price}</Card.Text>
                            <Button onClick={() => removeProduct(item)}>Remove Items from Cart</Button>
                            </Card.Body>
                        </Card>
                    )}

                </Row>
            </Container>
        </>
    )
}