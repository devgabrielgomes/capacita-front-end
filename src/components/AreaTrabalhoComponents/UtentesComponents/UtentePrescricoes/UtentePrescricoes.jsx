import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentePrescricoes.css";
import UtentePrescricoesItems from './UtentePrescricoesItems';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarPlus, faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const UtentePrescricoes = () => {
    let params = useParams();
    let patientId = params.id;
    const effectRan = useRef(false)
    const [patientPrescriptionsData, setPatientPrescriptionsData] = useState([]);
    const [staffData, setStaffData] = useState([]);
    const [exerciseTypesData, setExerciseTypesData] = useState([]);
    const [exercisesData, setExercisesData] = useState([]);
    const [adding, setAdding] = useState(false)

    const getPrescriptionsData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}prescriptions${PT}`, { headers })
        const data = await res.json()
        const patientPrescriptions = [];
        data.forEach(el => {
            if (el.patient != null && el.patient.id == patientId) {
                patientPrescriptions.push(el)
            }
        });
        setPatientPrescriptionsData(patientPrescriptions)
    }

    const getStaffData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}staff${PT}`, { headers })
        const data = await res.json()
        setStaffData(data)
    }

    const getExerciseTypes = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}exerciseTypes${PT}`, { headers })
        const data = await res.json()
        setExerciseTypesData(data)
    }

    const getExercises = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}exercises${PT}`, { headers })
        const data = await res.json()
        setExercisesData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getPrescriptionsData()
            getStaffData()
            getExerciseTypes()
            getExercises()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    /**
      * Display a success toast with a specific message
      * @param message
      */
    function toastSuccess(message) {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Display an error toast with a specific message
     * @param message
     */
    function toastError(message) {
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const UtentePrescricoesItemsAdd = () => {
        const [medicine, setMedicine] = useState();
        const [observation, setObservation] = useState();
        const [exerciseId, setExerciseId] = useState();
        const [initialDate, setInitialDate] = useState();
        const [finalDate, setFinalDate] = useState();

        /**
         * Execute all the put requests needed to add a prescription in the system
         * @param e
         * @returns {Promise<void>}
         */
        const postForm = async (e) => {
            e.preventDefault()
            await addPrescription()
        }

        const addPrescription = async (e) => {
            const period = initialDate.toISOString().slice(0, 10).replace(/-/g, "-") + " a " + finalDate.toISOString().slice(0, 10).replace(/-/g, "-");
            let prescriptionData = {
                "user_id": sessionStorage.getItem('id'),
                "patient_id": patientId,
                "exercise_id": exerciseId,
                "medicine": medicine,
                "observation": observation,
                "period": period
            }

            const headers = {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            };

            axios.post(`${API}prescriptions`, prescriptionData, { headers })
                .then((response) => {
                    setAdding(false)
                    getPrescriptionsData()
                    toastSuccess(`You just add a prescription to your system!`);
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    toastError(`Unable to add this prescription to your system!`)
                })
        }

        return (
            <>
                <Table className='prescriptions-table' bordered>
                    <thead>
                        <tr>
                            <th>Exercício</th>
                            <th>Período</th>
                            <th>Medicação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form>
                                    <Form.Select id="select-exe" value={exerciseId} onChange={(event) => { setExerciseId(event.target.value) }}>
                                        {(exercisesData && exercisesData.map((val, key) => {
                                            return (
                                                <option key={key} value={val.id}>{val.name}</option>
                                            )
                                        })
                                        )}
                                    </Form.Select>
                                </Form>
                            </td>
                            <td>
                                <div className='initial-date-container'>
                                    <span className='date-string'>Data Inicial:</span>
                                    <DatePicker className="date-picker"
                                        dateFormat="yyyy-MM-dd"
                                        selected={initialDate}
                                        value={initialDate}
                                        onChange={initialDate => { setInitialDate(initialDate) }}
                                    />
                                </div>
                                <div>
                                    <span className='date-string-2'>Data Final:</span>
                                    <DatePicker className="date-picker"
                                        dateFormat="yyyy-MM-dd"
                                        selected={finalDate}
                                        value={finalDate}
                                        onChange={finalDate => { setFinalDate(finalDate) }}
                                    />
                                </div>
                            </td>
                            <td>
                                <b>Medicação: </b>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    id="medicine"
                                    value={medicine}
                                    onChange={(event) => { setMedicine(event.target.value) }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <b>Observações: </b>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={observation}
                                    onChange={(event) => { setObservation(event.target.value) }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className='btn-container'>
                    <Button className='change-btn' variant="danger" onClick={() => setAdding(false)}>
                        <FontAwesomeIcon className='icon' icon={faXmark} /> Cancelar
                    </Button>{' '}
                    <Button className='change-btn' variant="success" onClick={postForm}>
                        <FontAwesomeIcon className='icon' icon={faFloppyDisk} /> Adicionar
                    </Button>{' '}
                </div>
                <hr className='hr'></hr>
            </>
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <h2>Prescricões</h2>
                </Col>
                <Col className='patients-list-btn'>
                    {!adding ? <Button variant="secondary" onClick={() => setAdding(true)}><FontAwesomeIcon icon={faCalendarPlus} /> Adicionar Prescrição</Button> : ""}
                </Col>
            </Row>
            <Row>
                <div>
                    {adding ? <UtentePrescricoesItemsAdd /> : ""}
                </div>

                {patientPrescriptionsData.length > 0 && patientPrescriptionsData.map((val, key) => {
                    return (
                        <div key={key}>
                            <UtentePrescricoesItems prescription={val} staffData={staffData} exercisesData={exercisesData} getPrescriptionsData={getPrescriptionsData} />
                            <hr className='hr'></hr>
                        </div>
                    )
                })}
            </Row>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default UtentePrescricoes