import { React, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TecnicoEF.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const TecnicoEF = () => {
    let params = useParams();
    let staffId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [staffData, setStaffData] = useState([]);

    const getStaffData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}staff/${staffId}${PT}`, { headers })
        const data = await res.json()
        setStaffData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getStaffData()
        }

        return () => {
            effectRan.current = true
        }
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <h2><b>Técnico:</b> {staffData.first_name} {staffData.last_name}</h2>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/technics_ef') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <img src='/src/assets/pt.png' className="rounded float-left" alt="user image" width='300px'></img>
                </Col>
                <Col>
                    <h3>Informações</h3>
                    <p><b>Data de Nascimento:</b> {staffData.birthdate}</p>

                    {staffData.location &&
                        <>
                            <p><b>Cidade:</b> {staffData.location.name}</p>
                            <p><b>Morada:</b> {staffData.location.address}</p>
                            <p><b>Região:</b> {staffData.location.region.name}</p>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}

export default TecnicoEF