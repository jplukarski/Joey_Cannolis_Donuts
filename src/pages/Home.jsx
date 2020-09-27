import React, {useState, useEffect} from 'react'
import app from '../base'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'


export default function Home() {
    const [cannolis, setCannolis] = useState([])
    const [donuts, setDonuts] = useState([])
    useEffect(() => {
        let doughnuts = []
        let fCannolis = []
        app.firestore().collection('donuts').get()
            .then(snapshot => {
                
                snapshot.forEach(doc => {
                doughnuts.push(doc.data())
                });
                setDonuts(doughnuts)
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        app.firestore().collection('cannolis').get()
        .then(snapshot => {
            
            snapshot.forEach(doc => {
            fCannolis.push(doc.data())
            });
            setCannolis(fCannolis)
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
                        <Jumbotron style={{textAlign: "center"}}><h1>Welcome to Joey Cannoli's Donuts!!</h1></Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <h1>Our Most Popular Donuts</h1>
                </Row>
                <Row className="justify-content-between">
                    {donuts.map(donut => {
                        if(donut.productID < 4){
                            return <Col key={donut.title}>
                                    <DonutCard image={donut.image} title={donut.title} price={donut.price} unit={donut.unit}/>
                                </Col>    
                        }
                    }
                    )}
                </Row>
                <Row>
                    <h1>Our Most Popular Cannolis</h1>
                </Row>
                <Row className="justify-content-between">
                    {cannolis.map(cannoli => {
                        if(cannoli.productID < 10){

                        return <Col key={cannoli.title}>
                                  <DonutCard image={cannoli.image} title={cannoli.title} price={cannoli.price} unit={cannoli.unit}/>
                               </Col>    
                        }
                    }
                    )}
                </Row>
            </Container>
        </>
    )
}