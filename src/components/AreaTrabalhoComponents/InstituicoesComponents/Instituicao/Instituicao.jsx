import { React, useEffect, useRef, useState } from 'react'
import "./Instituicao.css";
import { Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import institutionIcon from '/src/assets/building.png';

const Instituicao = () => {
    let params = useParams();
    let instituicaoId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false);
    const [institutionData, setInstitutionData] = useState([]);

    /**
     * GET request to set institution data
     * @returns {Promise<void>}
     */
    const getInstitutionData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}institutions/${instituicaoId}${PT}`, { headers })
        const data = await res.json()
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
                <Col className='institutions-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/institutions') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Row>
                <Col md={4} lg={4} xl={4}>
                    <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer"><img src={institutionIcon} className="img-fluid float-left" alt="user image" width='280px'></img></a>
                </Col>
                <Col md={8} lg={8} xl={8}>
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