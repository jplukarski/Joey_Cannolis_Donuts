import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Cart() {
    return(
        <>
            <Container>
                <Row style={{borderStyle: "solid", height: "500px"}}>
                    <Col sm={12} md={6} lg={6} xl={6}></Col>
                    <Col sm={12} md={6} lg={6} xl={6}>Continue as Guest</Col>
                </Row>
            </Container>
        </>
    )
}