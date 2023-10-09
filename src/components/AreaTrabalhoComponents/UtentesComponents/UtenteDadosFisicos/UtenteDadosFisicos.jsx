import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtenteDadosFisicos.css";
import { Row } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
const UtenteDadosFisicos = () => {
    let params = useParams();
    let patientId = params.id;
    const [patientData, setPatientData] = useState([]);
    const [patientAidType, setPatientAidType] = useState([]);
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {

            /**
             * GET request to set patient data
             * @returns {Promise<void>}
             */
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
                <p><b>Altura:</b> {patientData.height} cm</p>
                <p><b>Peso:</b> {patientData.weight} kg</p>
                <p><b>Lado Dominante:</b> {patientData.right_handed == 1 ? "Destro" : "Esquerdino"}</p>
                <p><b>Auxiliar de Locomoção:</b> {patientAidType}</p>
            </Row >
        </>
    )
}

export default UtenteDadosFisicos