import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PerfilPessoal.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const PerfilPessoal = () => {
    const effectRan = useRef(false)
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (effectRan.current === false && sessionStorage.getItem('token')) {
            const getStaff = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}staff${PT}`, { headers })
                const data = await res.json()
                data.forEach(item => {
                    if (item.user.email == sessionStorage.getItem('email')) {
                        setUserData(item)
                    }
                });
            }
            getStaff()

            return () => {
                effectRan.current = true
            }
        }
    }, [])


    return (
        <div className='perfil-pessoal'>

            <Row>
                <h2>Perfil Pessoal</h2>
            </Row>
            <Row>
                <Col md={4} lg={4} xl={4}>
                    <Image className='img-fluid project-info-image rounded float-left' src="/src/assets/user.jpg" alt="user image" width={300} />
                </Col>
                <Col md={8} lg={8} xl={8}>
                    <h3>Bem-vindo, <b>{userData.first_name} {userData.last_name}!</b></h3>
                    <hr></hr>
                    <h2>Informações Pessoais</h2>
                    <p><b>Nome:</b> {userData.first_name} {userData.last_name}</p>
                    <p><b>Email:</b> {sessionStorage.getItem('email')}</p>
                    <hr></hr>
                </Col>
            </Row>

        </div >
    )
}

export default PerfilPessoal