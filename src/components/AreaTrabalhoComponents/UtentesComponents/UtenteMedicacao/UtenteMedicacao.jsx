import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtenteMedicacao.css";
import { Button, Table, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom';

const UtenteMedicacao = () => {
    let params = useParams();
    let patientId = params.id;
    const effectRan = useRef(false)
    const navigate = useNavigate();
    const [patientMedicationData, setPatientMedicationData] = useState([]);
    const [staffData, setStaffData] = useState([]);

    /**
     * GET request to set medications data
     * @returns {Promise<void>}
     */
    const getMedicationsData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}prescriptions/${PT}`, { headers })
        const data = await res.json()
        const patientPrescriptions = [];
        data.forEach(el => {
            if (el.patient != null && el.patient.id == patientId) {
                patientPrescriptions.push(el)
            }
        });
        setPatientMedicationData(patientPrescriptions)
    }

    /**
     * GET request to set staff data
     * @returns {Promise<void>}
     */
    const getStaffData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}staff${PT}`, { headers })
        const data = await res.json()
        setStaffData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getMedicationsData()
            getStaffData()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    return (
        <>
            {patientMedicationData.length > 0 && patientMedicationData.map((val, key) => {
                return (
                    <div key={key} >

                        <Row className='top-row'>
                            <Col md={6} className='info-span'>
                                <span>
                                    <b>Autor:</b> {staffData[val.user.id - 1].first_name + ' '}
                                    {staffData[val.user.id - 1].last_name} | <b>Período:</b> {val.period}
                                </span>
                            </Col>
                            <Col md={6} className='edit-btn-col'>
                                <Button className='edit-btn' variant="warning"
                                    onClick={() => navigate(`/work_area/patients/${val.patient.id}/prescriptions`)}>
                                    <FontAwesomeIcon className='icon' icon={faPenToSquare} /> Editar
                                </Button>
                            </Col>
                        </Row>

                        <Table className='prescriptions-table' bordered>
                            <thead>
                                <tr>
                                    <th><b>Medicação:</b> </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {val.medicine}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <hr className='hr'></hr>
                    </div>
                )
            })}
        </>
    )
}

export default UtenteMedicacao