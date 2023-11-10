import React from 'react'
import "./Footer.css";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

const Footer = () => {
    return (
        <div className='footer sticky-md-bottom'>
            <Container md={12}>
                <Row md={12}>
                    <hr></hr>
                    <div className='mx-auto'>
                        <Image className='img-fluid capacita-slogan' src='/src/assets/capacita_logo_slogan.png' alt='Capacita Logo Slogan' />
                    </div>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col>
                        <Button variant="text">Página Inicial</Button>
                    </Col>
                    <Col>
                        <Button variant="text">Contactos</Button>
                    </Col>
                    <Col>
                        <Button variant="text">Sobre</Button>
                    </Col>
                </Row>
                <Row>
                    <span className='mx-auto'>
                        © 2023 Copyright: Gabriel Gomes
                    </span>

                </Row>
            </Container>
        </div>
    )
}

export default Footer