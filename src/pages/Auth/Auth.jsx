import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Auth.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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

async function loginUser(credentials) {
    return fetch(API + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(
            data => data.json(),
            window.location.href = '/area_trabalho'
        )
        .catch(({ response }) => {
            toastError(`As credenciais estão incorretas!`)
        })

}

export default function Auth() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [staffData, setStaffData] = useState();
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === false) {
            const getStaff = async () => {
                const headers = { 'Authorization': TOKEN };
                const res = await fetch(API + 'staff', { headers })
                const data = await res.json()
                console.log(data)
                setStaffData(data)
            }
            getStaff()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();
        getUserInfo()
        const token = await loginUser({
            email,
            password
        });
    }

    // function setToken(userToken) {
    //     sessionStorage.setItem('token', JSON.stringify(userToken));
    // }

    function getUserInfo() {
        staffData.forEach(staff => {
            if (staff.user.email == email) {
                console.log(staff.user.id)
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('id', staff.user.id);
            }
        });
    }



    return (
        <>
            <Header />

            <Container className='auth'>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                        <h1 className='page-title'>Autenticação</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Endereço de Email</Form.Label>
                                <Form.Control type="email" placeholder="Introduza o seu email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Button className='login-button' variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

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

Auth.propTypes = {
    setToken: PropTypes.func.isRequired
};
