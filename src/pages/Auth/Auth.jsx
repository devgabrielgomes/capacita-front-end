import React, { useState } from 'react';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Auth.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Display an error toast with a specific message
     * @param message
     */
    function toastError(message) {
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Function to reset form
     */
    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    /**
     * POST request to make a login
     * @param credentials
     * @returns {Promise<any>}
     */
    async function loginUser(credentials) {
        return fetch(API_LINK + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(res => res.json())
            .then(data => {
                if (data.access_token) {
                    sessionStorage.setItem('token', data.access_token);
                    sessionStorage.setItem('email', email);
                    if (sessionStorage.getItem('email') == "admin@gmail.com") {
                        sessionStorage.setItem('name', "Joaquim Alves")
                        sessionStorage.setItem('id', "1")
                    } else if (sessionStorage.getItem('email') != "therapist@gmail.com") {
                        sessionStorage.setItem('name', "Jorge Mendes")
                        sessionStorage.setItem('id', "2")
                    } else {
                        sessionStorage.setItem('name', "Alfredo Varela")
                        sessionStorage.setItem('id', "3")
                    }
                    window.location.href = '/';
                } else {
                    toastError(`As credenciais estão incorretas!`)
                    resetForm()
                }
            })
            .catch((e) => {
                toastError(`As credenciais estão incorretas!`)
                resetForm()
            })
    }

    /**
     * Handle a submit
     * @param e
     * @returns {Promise<void>}
     */
    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            email,
            password
        });
    }

    return (
        <>
            <motion.div
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
            >
                <Container className='auth'>
                    <Row className="justify-content-md-center">
                        <Col md={6}>
                            <h1 className='page-title'>Autenticação</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Endereço de Email</Form.Label>
                                    <Form.Control type="email" placeholder="Introduza o seu email" value={email} onChange={e => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <Button className='login-button' variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </>
    )
}
