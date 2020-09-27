import React, {useContext} from 'react'
import Checkout from '../components/Checkout'
import {AuthContext} from '../Auth'

export default function Cart() {
    const { currentUser } = useContext(AuthContext);

    return(
        <>
                    <Checkout/>
        </>
    )
}