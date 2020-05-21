import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'

const bestDonutData = [
    {
        image: "https://www.errenskitchen.com/wp-content/uploads/2016/02/Chocolate-Glazed-Doughnuts-feature-500x480.jpg",
        title: "Glazed Chocolate Donut",
        price: "0.99",
        unit: "per donut"
    },
    {
        image: "https://i0.wp.com/www.thesugarpixie.net/wp-content/uploads/2015/02/SourCream_OldFashioned2-e1423685370680.jpg?resize=700%2C466&ssl=1",
        title: "Sour Cream Old-Fashioned",
        price: "1.24",
        unit: "per donut"
    },
    {
        image: "https://www.keyingredient.com/media/4b/6f/e7afaf064fccaaf66fbcc33568295e579b05.jpg/rh/baked-strawberry-donuts.jpg",
        title: "Double Strawberry",
        price: "0.89",
        unit: "per donut"
    }
]

const otherDonutData = [
    {
        image: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-donuts-2-1542639436.jpg",
        title: "Joey Cannoli's Classi Donut",
        price: "0.49",
        unit: "per donut"
    },
    {
        image: "https://www.cookingclassy.com/wp-content/uploads/2020/05/15-minute-donuts-6.jpg",
        title: "Classic donut holes",
        price: "5",
        unit: "per dozen donuts"
    },
    {
        image: "https://thebigmansworld.com/wp-content/uploads/2019/03/baked-vegan-glutenfree-paleo-keto-donuts-4.jpg",
        title: "Vegan Gluten Free baked donuts",
        price: "2.49",
        unit: "per donut"
    },
]

export default function Donuts() {
    return(
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Jumbotron style={{textAlign: "center"}}><h1>View all of our Classic donuts!</h1></Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <h1>Our Most Popular Donuts</h1>
                </Row>
                <Row className="justify-content-between">
                    {bestDonutData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
                <Row>
                    <h1>The rest of our selection!</h1>
                </Row>
                <Row className="justify-content-between">
                    {otherDonutData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
            </Container>
        </>
    )
}