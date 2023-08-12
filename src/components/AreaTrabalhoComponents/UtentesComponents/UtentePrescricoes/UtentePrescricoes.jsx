import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentePrescricoes.css";
import UtentePrescricoesItems from './UtentePrescricoesItems';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const UtentePrescricoes = () => {
    let params = useParams();
    let patientId = params.id;
    const effectRan = useRef(false)
    const [patientPrescriptionsData, setPatientPrescriptionsData] = useState({});
    const [staffData, setStaffData] = useState({});
    const [exerciseTypesData, setExerciseTypesData] = useState({});
    const [selectedComponent, setSelectedComponent] = useState()

    useEffect(() => {
        if (effectRan.current === false) {
            const getGenders = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}prescriptions${PT}`, { headers })
                const data = await res.json()
                const patientPrescriptions = [];
                data.forEach(el => {
                    if (el.patient.id == patientId) {
                        patientPrescriptions.push(el)
                    }
                });
                console.log(patientPrescriptions)
                setPatientPrescriptionsData(patientPrescriptions)
            }

            const getStaffData = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}staff${PT}`, { headers })
                const data = await res.json()
                console.log(data)
                setStaffData(data)
            }

            const getExerciseTypes = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}exerciseTypes${PT}`, { headers })
                const data = await res.json()
                console.log(data)
                setExerciseTypesData(data)
            }

            getGenders()
            getStaffData()
            getExerciseTypes()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <h2>Utente Prescricoes</h2>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary"><FontAwesomeIcon icon={faCalendarPlus} /> Adicionar Prescrição</Button>{' '}
                </Col>
            </Row>
            <Row>

                {patientPrescriptionsData.length > 0 && patientPrescriptionsData.map((val, key) => {
                    return (
                        <UtentePrescricoesItems key={key} prescription={val} staffData={staffData} exerciseTypesData={exerciseTypesData} />
                    )
                })}
            </Row>
        </>
    )
}

export default UtentePrescricoes