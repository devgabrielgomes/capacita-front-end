import React, { useEffect, useState } from 'react';
import "./Auth.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';

const Auth = () => {
    const [token, setToken] = useState();
    return (
        <>
            <Header />

            <Container className='auth'>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h1 className='page-title'>Autenticação</h1>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Endereço de Email</Form.Label>
                                <Form.Control type="email" placeholder="Introduza o seu email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button className='login-button' variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Auth