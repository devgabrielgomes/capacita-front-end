import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    const effectRan = useRef(false)
    const [userType, setUserType] = useState();

    useEffect(() => {
        if (effectRan.current == false && sessionStorage.getItem('token') != null) {
            getUserType(sessionStorage.getItem('email'))
        }
        return () => {
            effectRan.current = true
        }
    }, [])

    function getUserType(email) {
        const mail = email.split("@");
        if (mail[0] == "admin") {
            setUserType("Administrador")
        } else if (mail[0] == "therapist") {
            setUserType("Terapeuta")
        } else {
            setUserType("Operador")
        }
    }

    function logout() {
        sessionStorage.clear()
        window.location.href = '/home';
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" id='navbar'>
                <Container id='navbar-container'>
                    <Navbar.Brand href="/home">
                        <img src='/src/assets/capacita_logo.png' alt="Capacita Logo" height="40px" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className='nav-link' as={Link} to="/home">Página Inicial</Nav.Link>
                            {sessionStorage.getItem('email') != null &&
                                <Nav.Link className='nav-link' as={Link} to="/work_area/personal_profile">Área de Trabalho</Nav.Link>
                            }
                            <Nav.Link className='nav-link' as={Link} to="/contacts">Contatos</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to="/about">Sobre</Nav.Link>
                        </Nav>
                        <Nav>
                            {sessionStorage.getItem('email') == null ?
                                <Nav.Link className='right-side' as={Link} to="/auth">
                                    <FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sessão
                                </Nav.Link>
                                :
                                <div className='right-side'>
                                    <div className='user-name'>
                                        <FontAwesomeIcon icon={faUser} /> <b>{userType}</b> {sessionStorage.getItem('name')}
                                    </div>
                                    <Nav.Link className='nav-link' id='logout-link' as={Link} onClick={() => { logout() }}>
                                        <Button variant="outline-danger">
                                            <FontAwesomeIcon icon={faRightFromBracket} /> Terminar sessão
                                        </Button>
                                    </Nav.Link>
                                </div>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header