import React from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'

const bestCannoliData = [
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

const otherCannoliData = [
    {
        image: "https://cdn.shopify.com/s/files/1/2404/1979/products/cannoli_close_uprs_1024x1024@2x.jpg?v=1571399033",
        title: "Cherry Cannoli",
        price: "20",
        unit: "per dozen cannolis"
    },
    {
        image: "https://4.bp.blogspot.com/-F5JJtgs_I7c/Vjy5K4TPDVI/AAAAAAAAAJ0/zE1MMZlaIsc/s1600/Cannolis%2B1.jpg",
        title: "Vegan Gluten Free cannolis",
        price: "30",
        unit: "per dozen cannolis"
    },
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRtXvb_q4taA9jtbvwWVALxhZQfIpbf5R3H5VViiZMg7Qd7dFC5&usqp=CAU",
        title: "Double Chocolate cannolis",
        price: "20",
        unit: "per dozen cannolis"
    },
]

export default function Donuts() {
    return(
        <>
            <Container>
                <Row>
                    <Col sm={12}>
                        <Jumbotron style={{textAlign: "center"}}><h1>View all of our Classic cannolis!</h1></Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <h1>Our Most Popular Cannolis</h1>
                </Row>
                <Row className="justify-content-between">
                    {bestCannoliData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
                <Row>
                    <h1>The rest of our selection!</h1>
                </Row>
                <Row className="justify-content-between">
                    {otherCannoliData.map(donut => 
                    <Col key={donut.title}>
                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                    </Col>    
                    )}
                </Row>
            </Container>
        </>
    )
}