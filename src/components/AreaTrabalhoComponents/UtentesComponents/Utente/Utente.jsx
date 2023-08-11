import { React, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Utente.css";
import UtenteItems from './UtenteItems.jsx';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Utente = () => {
    let params = useParams();
    let patientId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [patientData, setPatientData] = useState({});
    const [patientLocationData, setPatientLocationData] = useState({});
    const [patientLocationRegionData, setPatientLocationRegionData] = useState({});
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
                setPatientLocationData(data.location)
                setPatientLocationRegionData(data.location.region)
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
                    <Button variant="secondary" onClick={() => { navigate('/work_area/patients/list') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <img src='/src/assets/user.jpg' className="rounded float-left" alt="user image" width='300px'></img>
                </Col>
                <Col>
                    <h3>Informações Pessoais</h3>
                    <p><b>NIF:</b> {patientData.NIF}</p>
                    <p><b>NISS:</b> {patientData.NISS}</p>
                    <hr></hr>
                    <p><b>Data de Nascimento:</b> {patientData.birthdate}</p>
                    <p><b>Género:</b> {patientData.gender}</p>
                    <hr></hr>
                    <p><b>Nome Lar:</b> {patientLocationData.name}</p>
                    <p><b>Localização Lar:</b> {patientLocationData.address}</p>
                    <p><b>Região Lar:</b> {patientLocationRegionData.name}</p>
                </Col>
            </Row>

            <Container>
                <Form.Select id='select-page' onChange={() => { getCurrentPage() }} aria-label="Default select example">
                    <UtenteItems patientId={patientId} />
                </Form.Select>
                <Outlet />
            </Container>
        </>
    )
}

export default Utente