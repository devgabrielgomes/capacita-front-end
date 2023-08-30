import { React, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Instituicao.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Instituicao = () => {
    let params = useParams();
    let instituicaoId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [institutionData, setInstitutionData] = useState([]);

    const getInstitutionData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}institutions/${instituicaoId}${PT}`, { headers })
        const data = await res.json()
        console.log(data)
        setInstitutionData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getInstitutionData()
        }

        return () => {
            effectRan.current = true
        }
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <h2><b>Instituição:</b> {institutionData.name}</h2>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/institutions') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <img src='/src/assets/building.png' className="rounded float-left" alt="user image" width='300px'></img>
                </Col>
                <Col>
                    <h3>Informações</h3>
                    {institutionData.location &&
                        <>
                            <p><b>Cidade:</b> {institutionData.location.name}</p>
                            <p><b>Morada:</b> {institutionData.location.address}</p>
                            <p><b>Região:</b> {institutionData.location.region.name}</p>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}

export default Instituicao