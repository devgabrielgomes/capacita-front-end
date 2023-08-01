import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
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
                            <Nav.Link className='nav-link' as={Link} to="/home">Página Inicial</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to="/contatos">Contatos</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to="/sobre">Sobre</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to="/area_trabalho">Area de Trabalho</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className='nav-link' as={Link} to="/auth">
                                <FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sessão
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header