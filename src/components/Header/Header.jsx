import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
    let email = sessionStorage.getItem('email');
    const effectRan = useRef(false)
    const [staffData, setStaffData] = useState();
    const [userName, setUserName] = useState();
    const [userType, setUserType] = useState();

    useEffect(() => {
        if (effectRan.current === false) {
            const getStaff = async () => {
                const headers = { 'Authorization': TOKEN };
                const res = await fetch(API + 'staff', { headers })
                const data = await res.json()
                setStaffData(data)
                getUserInfo()
            }
            getStaff()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    function getUserInfo() {
        staffData.forEach(staff => {
            if (staff.user.email == email) {
                console.log(staff.user.id)
                setUserName(staff.first_name + " " + staff.last_name)
            }
        });
        const mail = email.split("@");
        if (mail[0] == "admin") {
            setUserType("Administrador")
        } else if (mail[0] == "therapist") {
            setUserType("Terapeuta")
        } else {
            setUserType("Operador")
        }
    }


    function deleteStorage() {
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
                            <Nav.Link className='nav-link' as={Link} to="/contatos">Contatos</Nav.Link>
                            <Nav.Link className='nav-link' as={Link} to="/sobre">Sobre</Nav.Link>
                            {email != null &&
                                <Nav.Link className='nav-link' as={Link} to="/area_trabalho">Area de Trabalho</Nav.Link>
                            }


                        </Nav>
                        <Nav>
                            {email == null ?
                                <Nav.Link className='nav-link' as={Link} to="/auth">
                                    <FontAwesomeIcon icon={faRightToBracket} /> Iniciar Sessão
                                </Nav.Link>
                                :
                                <Nav.Link className='nav-link' as={Link} onClick={() => { deleteStorage() }}>
                                    <FontAwesomeIcon icon={faUser} /> {userType} {userName}
                                    <Button variant="outline-danger">Terminar sessão</Button>{' '}
                                </Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header