import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PerfilPessoal.css";
import { Row, Col, Image } from 'react-bootstrap';
import userIcon from '/src/assets/user.png';


const PerfilPessoal = () => {
    const [staffData, setStaffData] = useState([]);
    const effectRan = useRef(false)

    useEffect(() => {
        if (effectRan.current === false) {
            getStaffData()
            return () => {
                effectRan.current = true
            }
        }
    }, [])

    /**
     * GET request to set staff data
     * @returns {Promise<void>}
     */
    const getStaffData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}staff/${sessionStorage.getItem('id')}${PT}`, { headers })
        const data = await res.json()
        setStaffData(data)
    }

    return (
        <div className='perfil-pessoal'>
            <Row>
                <h2>Perfil Pessoal</h2>
            </Row>
            <Row>
                <Col md={4} lg={4} xl={4}>
                    <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid float-left' src={userIcon} alt="user image" width={280} /></a>
                </Col>
                <Col md={8} lg={8} xl={8}>
                    <h3>Bem-vindo <b>{sessionStorage.getItem('name')}!</b></h3>
                    <hr></hr>
                    <h4>Informações Pessoais</h4>
                    <p><b>Nome:</b> {sessionStorage.getItem('name')}</p>
                    <p><b>Email:</b> {sessionStorage.getItem('email')}</p>
                    <p><b>Data de Nascimento:</b> {staffData.birthdate}</p>
                    <hr></hr>
                    <h4>Localização</h4>
                    <p><b>Nome:</b> {staffData.location && staffData.location.name}</p>
                    <p><b>Morada:</b> {staffData.location && staffData.location.address}</p>
                </Col>
            </Row>
        </div >
    )
}

export default PerfilPessoal