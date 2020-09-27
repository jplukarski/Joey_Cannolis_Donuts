import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DonutCard from '../components/DonutCards'
import app from '../base'

export default function Cannolis() {
    const [cannolis, setCannolis] = useState([])
    useEffect(() => {
        let data = []
        app.firestore().collection('cannolis').get()
            .then(snapshot => {
                
                snapshot.forEach(doc => {
                data.push(doc.data())
                });
                setCannolis(data)
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
                        <Jumbotron style={{textAlign: "center"}}><h1>View all of our Classic cannolis!</h1></Jumbotron>
                    </Col>
                </Row>

                <Row>
                    <h1>Our Most Popular Cannolis</h1>
                </Row>

                <Row className="justify-content-between">
                    {cannolis.map(cannoli => {   
                        if(cannoli.productID < 10){
                            return  <Col key={cannoli.productID}>
                                        <DonutCard image={cannoli.image} title={cannoli.title} price={cannoli.price} unit={cannoli.unit}/>
                                    </Col>    
                        }
                    }
                    )}
                </Row>

                <Row>
                    <h1>The rest of our selection!</h1>
                </Row>

                <Row className="justify-content-between">
                    {cannolis.map(cannoli => {   
                        if(cannoli.productID > 9){
                            return  <Col key={cannoli.productID}>
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