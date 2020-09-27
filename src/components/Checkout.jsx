import React, {useState, useEffect, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import DropIn from './DropIn'
import { AuthContext } from "../Auth";
import app from '../base'


export default function GuestCheckout() {
    const [clientToken, setClientToken] = useState('')
    const [btCustId, setBraintreeCustId] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { currentUser } = useContext(AuthContext);


    useEffect(()=>{

        if(currentUser){
            setIsLoggedIn(true)
        }

        getBraintreeCustomerID()

    },[currentUser])

    const getBraintreeCustomerID = ( ) => {
        if(!currentUser || btCustId !== ''){
            console.log('dope')
            getClientToken()
        } else {
            app
            .firestore()
            .collection('braintree_ids')
            .doc(currentUser.uid)
            .get()
            .then((res) => {
                setBraintreeCustId(res.data().bt_id)
            })
        }
    }

    const getClientToken = () => {
        console.log(btCustId)
        if(btCustId === '') {
            fetch('https://payments.sandbox.braintree-api.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': 'aDJrcmdqeDNxajd0c3A2dzplMmU3MzUyMGRhMDQzNTQ3ZDM4NWM4Y2ZhNjkxNmJkOQ==',
                    'Braintree-Version': '2020-06-24',
                    'Content-Type': 'application/json',
                },
                body: '{"query": "mutation {createClientToken{clientToken}}"}'
            })
            .then(res => res.json())
            .then(result => {
                setClientToken(result.data.createClientToken.clientToken)
            })
        } else {
            fetch('https://payments.sandbox.braintree-api.com/graphql', {
                method: 'POST',
                headers: {
                    'Authorization': 'aDJrcmdqeDNxajd0c3A2dzplMmU3MzUyMGRhMDQzNTQ3ZDM4NWM4Y2ZhNjkxNmJkOQ==',
                    'Braintree-Version': '2020-06-24',
                    'Content-Type': 'application/json',
                },
                //need to add the mutation to generate a client token the the bt cust id
                body: '{"query": "mutation {createClientToken{clientToken}}"}'
            })
            .then(res => res.json())
            .then(result => {
                setClientToken(result.data.createClientToken.clientToken)
            })
        }
    }

    return(
        <>
            <h1>Checking out as guest</h1>
            {clientToken !== '' ? <DropIn clientToken={clientToken} /> : <div>loading...</div>}
        </>
    )
}

