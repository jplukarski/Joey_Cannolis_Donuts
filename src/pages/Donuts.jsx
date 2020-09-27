import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'
import app from '../base'

export default function Donuts() {
    const [donuts, setDonuts] = useState([])
    useEffect(() => {
        let data = []
        app.firestore().collection('donuts').get()
            .then(snapshot => {
                
                snapshot.forEach(doc => {
                data.push(doc.data())
                });
                setDonuts(data)
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }, [])
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
                    {donuts.map(donut => {   
                        if(donut.productID < 4){
                            return  <Col key={donut.productID}>
                                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                                    </Col>    
                        }
                    }
                    )}
                </Row>

                <Row>
                    <h1>The rest of our selection!</h1>
                </Row>

                <Row className="justify-content-between">
                    {donuts.map(donut => {   
                        if(donut.productID > 3){
                            return  <Col key={donut.productID}>
                                        <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                                    </Col>    
                        }
                    }
                    )}
                </Row>

            </Container>
        </>
    )
}