import React from 'react'
import "./Header.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
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
                            <Nav.Link className='nav-link'>
                                <Link to="/home">Página Inicial</Link>
                            </Nav.Link>
                            <Nav.Link className='nav-link'>
                                <Link to="/contatos">Contatos</Link>
                            </Nav.Link>
                            <Nav.Link className='nav-link'>
                                <Link to="/sobre">Sobre</Link>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className='nav-link'>
                                <FontAwesomeIcon icon={faRightToBracket} /> <Link to="/auth"> Iniciar Sessão</Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header