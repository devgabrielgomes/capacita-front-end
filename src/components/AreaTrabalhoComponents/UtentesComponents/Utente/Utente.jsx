import { React, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Utente.css";
import UtenteItems from './UtenteItems.jsx';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Utente = () => {
    let params = useParams();
    let patientId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [patientData, setPatientData] = useState([]);
    var e = document.getElementById("select-page");
    function getCurrentPage() {
        var val = e.options[e.selectedIndex].value;
        navigate(val)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            const getPatientData = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}patients/${patientId}${PT}`, { headers })
                const data = await res.json()
                setPatientData(data)
            }
            getPatientData()
        }

        return () => {
            effectRan.current = true
        }
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <h2><b>Utente:</b> {patientData.first_name} {patientData.last_name}</h2>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/patients') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={4} lg={4} xl={4}>
                    <Image className='img-fluid project-info-image rounded float-left' src="/src/assets/user.jpg" alt="user image" width={300} />
                </Col>
                <Col md={8} lg={8} xl={8}>
                    <h3>Informações Pessoais</h3>
                    <p><b>NIF:</b> {patientData.NIF}</p>
                    <p><b>NISS:</b> {patientData.NISS}</p>
                    <p><b>Email:</b> {patientData.email}</p>
                    <hr></hr>
                    <p><b>Data de Nascimento:</b> {patientData.birthdate}</p>
                    <p><b>Género:</b> {patientData.gender}</p>
                    <hr></hr>
                    {patientData.location &&
                        <>
                            <p><b>Nome da Instituição:</b> {patientData.location.name}</p>
                            <p><b>Localização da Instituição:</b> {patientData.location.address}</p>
                            <p><b>Região da Instituição:</b> {patientData.location.name}</p>
                        </>
                    }
                </Col>
            </Row >

            <Container className='patient-items-container'>
                <Form.Select id='select-page' onChange={() => { getCurrentPage() }}>
                    <UtenteItems patientId={patientId} />
                </Form.Select>
                <Outlet />
            </Container>
        </>
    )
}

export default Utente