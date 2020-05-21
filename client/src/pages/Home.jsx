import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'

const donutData = [
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

const cannoliData =[
    {
        image: "https://www.grandmotherskitchen.org/uploads/3427/thumbnails/recipe.jpg",
        title: "Joey Cannoli's Classic Cannoli",
        price: "20",
        unit: "per dozen cannolis"
    },
    {
        image: "https://hips.hearstapps.com/hmg-prod/images/delish-190807-cannolis-0214-landscape-pf-1565647073.jpg?crop=0.744xw%3A0.627xh%3B0.130xw%2C0.202xh&resize=480%3A270",
        title: "Chocolate Chip Cannoli",
        price: "20",
        unit: "per dozen cannolis"
    },
    {
        image: "https://media-cdn.tripadvisor.com/media/photo-s/09/6c/ab/03/mike-s-pastry.jpg",
        title: "Almond Cannoli",
        price: "25",
        unit: "per dozen cannolis"
    }
]

export default function Home() {
    return(
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Jumbotron style={{textAlign: "center"}}><h1>Welcome to Joey Cannoli's Donuts!!</h1></Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <h1>Our Most Popular Donuts</h1>
                </Row>
                <Row className="justify-content-between">
                    {donutData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
                <Row>
                    <h1>Our Most Popular Cannolis</h1>
                </Row>
                <Row className="justify-content-between">
                    {cannoliData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
            </Container>
        </>
    )
}