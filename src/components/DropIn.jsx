import React, {useState, useEffect, useContext} from 'react'
import dropin from 'braintree-web-drop-in'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import {CartContext} from '../Cart'

export default function DropIn(props){
    const [nonce, setNonce] = useState('')
    const [amount, setAmount] = useState(0)
    const { CartState } = useContext(CartContext);
    useEffect(() => {
        if(nonce === '') {
            createDropIn(props.clientToken)
            let totalFromCart = 0
            CartState.cart.forEach(item => totalFromCart = totalFromCart + parseFloat((item.price)))
            setAmount(totalFromCart)
        } else {
            chargePaymentMethod(nonce)
        }
    }, [nonce])



    const createDropIn = (clientToken) => {
        dropin.create({
            authorization: clientToken,
            container: "#btdropin",
            venmo: {}
        }, (clientErr, clientInstance) => {
            if(clientErr) {
                alert("There was an error. Please report the following error to customer support: " + clientErr)
                return
            }
            clientDidCreate(clientInstance)
        })
    }

    const clientDidCreate = (instance) => {
        const button = document.getElementById('makeAPayment')
        button.addEventListener('click', function() {
            instance.requestPaymentMethod(function (requestPaymentMethodErr, payload){
                if(requestPaymentMethodErr){
                    alert("There was an error. Please report the following error to customer support: " + requestPaymentMethodErr)
                    return
                }
                setNonce(payload.nonce)
            })
        })
    }
    
    const chargePaymentMethod = (nonce) => {
        fetch('https://payments.sandbox.braintree-api.com/graphql', {
            method: 'Post',
            headers: {
                'Authorization': 'aDJrcmdqeDNxajd0c3A2dzplMmU3MzUyMGRhMDQzNTQ3ZDM4NWM4Y2ZhNjkxNmJkOQ==',
                'Braintree-Version': '2020-06-24',
                'Content-Type': 'application/json',
            },
            body: `{"query": "mutation chargePaymentMethod($input: ChargePaymentMethodInput!){chargePaymentMethod(input: $input) {transaction {id status}}}","variables":{"input":{"paymentMethodId":"${nonce}","transaction":{"amount":"${amount}"}}}}`
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }
    return(
        <>
                <Container style={{borderStyle: "solid", height: "500px"}}>
                    <Row>
                    <h2>Total: ${amount}</h2>
                    </Row>
                    <Row>
                        <div id="btdropin"></div>
                    </Row>
                    <Row>
                        <Button id="makeAPayment">Make a Payment</Button>
                    </Row>
                </Container>
        </>
    )
}