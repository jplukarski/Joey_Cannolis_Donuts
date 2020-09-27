import React, {useState, useEffect, useContext} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
// import {CartContext} from '../Cart'
import app from '../base'
import { AuthContext } from "../Auth";  

export default function DonutCard(props ) { 
    const [show, setShow] = useState(false);
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [total, setTotal] = useState(0)
    // const { CartState } = useContext(CartContext);
    const { currentUser } = useContext(AuthContext);

    const handleClose = () => {
        setShow(false)
        setTotal(0)
    };
    const handleShow = () => setShow(true);
    const handleSelect = (event) => {setNumberOfItems(parseInt(event))}

    useEffect(()=>{
        setTotal(Math.round((numberOfItems * props.price)*100) / 100 )
    },[numberOfItems, props.price])

    const addToCart = () => {
        const bag = {
            image: props.image,
            title:props.title,
            price:total,
            count:numberOfItems
        }
        if(currentUser){
            app
                .firestore()
                .collection(currentUser.uid)
                .add(bag)
                .then((res) => console.log(res.id))
        } else {
            app
            .firestore()
            .collection(localStorage.getItem("sessionID"))
            .add(bag)
            .then((res) => console.log(res.id))
        }

        handleClose()
    }
    
    return(
        <>
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={props.image} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Text>
                        ${props.price} {props.unit}
                    </Card.Text>
                    <Button variant="primary" onClick={handleShow} block >Add to Cart</Button>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add {props.title} to your cart</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <img src={props.image} alt=""/>

                </Modal.Body>
                <Modal.Body>

                    How many?
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">{numberOfItems}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={1} onSelect={handleSelect}>1</Dropdown.Item>
                            <Dropdown.Item eventKey={2} onSelect={handleSelect}>2</Dropdown.Item>
                            <Dropdown.Item eventKey={3} onSelect={handleSelect}>3</Dropdown.Item>
                            <Dropdown.Item eventKey={4} onSelect={handleSelect}>4</Dropdown.Item>
                            <Dropdown.Item eventKey={5} onSelect={handleSelect}>5</Dropdown.Item>
                            <Dropdown.Item eventKey={6} onSelect={handleSelect}>6</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    Total : ${total}
                </Modal.Body>
                <Modal.Footer>
                    {numberOfItems === 0 ? '' : <Button variant="success" onClick={() => addToCart()}>Add to cart</Button>}
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
}