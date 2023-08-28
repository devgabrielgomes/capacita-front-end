import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtenteDadosFisicos.css";
import { Form, Button, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
const UtenteDadosFisicos = () => {
    let params = useParams();
    let patientId = params.id;
    const [patientData, setPatientData] = useState([]);
    const [patientAidType, setPatientAidType] = useState([]);
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {
            const getPatientData = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}patients/${patientId}${PT}`, { headers })
                const data = await res.json()
                setPatientAidType(data.aid_type.name)
                setPatientData(data)
            }
            getPatientData()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    return (
        <>
            <Row>
                <h2>Dados Físicos</h2>
                <hr></hr>
            </Row>
            <Row>
                <h3>Informações Pessoais</h3>
                <p><b>Altura:</b> {patientData.height} cm</p>
                <p><b>Peso:</b> {patientData.weight} kg</p>
                <p><b>Lado Dominante:</b> {patientData.right_handed == 1 ? "Destro" : "Esquerdino"}</p>
                <p><b>Auxiliar de Locomoção:</b> {patientAidType}</p>
            </Row >
        </>
    )
}

export default UtenteDadosFisicos