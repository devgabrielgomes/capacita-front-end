import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Auth.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [staffData, setStaffData] = useState();
    const effectRan = useRef(false)

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

    const resetForm = () => {
        setEmail("")
        setPassword("")
    }

    async function loginUser(credentials) {
        return fetch(API + 'login', {
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
                    window.location.href = '/area_trabalho'
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

    const handleSubmit = async e => {
        e.preventDefault();
        await loginUser({
            email,
            password
        });
    }

    return (
        <>
            <Header />
            <motion.div
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
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
            <Footer />
            <TostifyToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

// Auth.propTypes = {
//     setToken: PropTypes.func.isRequired
// };
