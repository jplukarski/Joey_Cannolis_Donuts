import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import React from 'react'

export default function DonutCard(props) {
    return(

        <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={props.image} />
        <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                ${props.price} {props.unit}
            </Card.Text>
            <Button variant="primary">Add to Cart</Button>
        </Card.Body>
    </Card>
        )
}