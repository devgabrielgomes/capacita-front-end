import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentePrescricoes.css";
import DatePicker from "react-datepicker";
import { Form, Button, Row, Table, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import moment from "moment";
import { toast } from 'react-toastify';

const UtentePrescricoesItems = ({ prescription, staffData, exercisesData, exerciseTypeData, getPrescriptionsData }) => {
    const [editing, setEditing] = useState(false)
    const effectRan = useRef(false)

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

    const UtentePrescricoesItemsView = ({ prescription, staffData }) => {
        const [exerciseTypeId, setExerciseTypeId] = useState(prescription.exercise.type.id);
        return (
            <>
                <Row className='top-row'>
                    <Col md={6} className='info-span'>
                        <span><b>Autor: </b>
                            {staffData[prescription.user.id - 1].first_name} {staffData[prescription.user.id - 1].last_name} |
                            <b> Período:</b> {prescription.period}
                        </span>
                    </Col>
                    <Col md={6} className='edit-btn-col'>
                        <Button className='edit-btn' variant="warning" onClick={() => setEditing(true)}>
                            <FontAwesomeIcon className='icon' icon={faPenToSquare} /> Editar
                        </Button>
                    </Col>
                </Row>
                <Table className='prescriptions-table' bordered>
                    <thead>
                        <tr>
                            <th>Tipo de Prescrição</th>
                            {exerciseTypeId == 1 ?
                                <>
                                    <th>Exercício</th>
                                    <th>Atributos do exercício</th>
                                </>
                                :
                                <th>Exercícios a realizar</th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{prescription.exercise.type.name}</td>
                            {exerciseTypeId == 1 ?
                                <>
                                    <td>{prescription.exercise.name}</td>
                                    <td>
                                        {prescription.exercise.attributes && prescription.exercise.attributes.map((val, key) => {
                                            return (
                                                <span id={val.id} key={key}>{val.name}<br /></span>
                                            )
                                        })}
                                    </td>
                                </>
                                :
                                <td>
                                    {prescription.observation}
                                </td>
                            }

                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <b>Descrição: </b>{prescription.exercise.description}
                            </td>
                        </tr>
                        <tr>
                            {exerciseTypeId == 1 &&
                                <td colSpan={3}>
                                    <b>Observações: </b>
                                    {prescription.observation}
                                </td>
                            }
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }

    const UtentePrescricoesItemsEdit = ({ prescription, exercisesData, exerciseTypeData, getPrescriptionsData }) => {
        const [medicine, setMedicine] = useState(prescription.medicine);
        const [observation, setObservation] = useState(prescription.observation);
        const [exerciseId, setExerciseId] = useState(prescription.exercise.id);
        const [exerciseTypeId, setExerciseTypeId] = useState(prescription.exercise.type.id);
        const [initialDate, setInitialDate] = useState();
        const [finalDate, setFinalDate] = useState();

        const getDates = () => {
            if (prescription.period && prescription.period.length == 23) {
                const prescriptionSplit = prescription.period.split(' ');
                setInitialDate(moment(prescriptionSplit[0], 'YYYY/MM/DD').toDate())
                setFinalDate(moment(prescriptionSplit[2], 'YYYY/MM/DD').toDate())
            }
        }

        useEffect(() => {
            if (effectRan.current === false) {
                getDates()

                return () => {
                    effectRan.current = true
                }
            }
        }, [])

        /**
         * Execute all the put requests needed to edit a prescription in the system
         * @param e
         * @returns {Promise<void>}
         */
        const postForm = async (e) => {
            e.preventDefault()
            await editPrescription()
        }

        const editPrescription = async (e) => {
            var newExerciseID = exerciseId;
            if (exerciseTypeId == 2) {
                newExerciseID = 8;
            }

            const period = initialDate.toISOString().slice(0, 10).replace(/-/g, "-") + " a "
                + finalDate.toISOString().slice(0, 10).replace(/-/g, "-");
            let prescriptionData = {
                "patient_id": prescription.patient.id,
                "exercise_id": newExerciseID,
                "medicine": medicine,
                "observation": observation,
                "period": period
            }

            const headers = {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            };

            axios.put(`${API}prescriptions/${prescription.id}`, prescriptionData, { headers })
                .then((response) => {
                    toastSuccess(`You just edited the prescription number "${prescription.id}" from your system!`);
                    setEditing(false);
                    getPrescriptionsData();
                })
                .catch(function (error) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    toastError(`Unable to edit the prescription number "${prescription.id}" from your system!`)
                })
        }

        return (
            <>
                <Table className='prescriptions-table' bordered>
                    <thead>
                        <tr>
                            <th>Tipo de Prescrição</th>
                            {exerciseTypeId == 1 &&
                                <th>Exercício</th>
                            }
                            <th>Período</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form>
                                    <Form.Select id="select-exe-type" value={exerciseTypeId} onChange={(event) => { setExerciseTypeId(event.target.value) }}>
                                        {(exerciseTypeData && exerciseTypeData.map((val, key) => {
                                            return (
                                                <option key={key} value={val.id}>{val.name}</option>
                                            )
                                        }))}
                                    </Form.Select>
                                </Form>
                            </td>
                            {exerciseTypeId == 1 &&
                                <td>
                                    <Form>
                                        <Form.Select id="select-exe" value={exerciseId} onChange={(event) => { setExerciseId(event.target.value) }}>
                                            {exercisesData && exercisesData.map((val, key) => {
                                                return (
                                                    <option key={key} value={val.id}>{val.name}</option>
                                                )

                                            })}
                                        </Form.Select>
                                    </Form>
                                </td>
                            }
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
                        </tr>
                    </tbody>
                </Table>
                <Table className='prescriptions-table' bordered>
                    <thead>
                        <tr>
                            <th>Medicação</th>
                            <th colSpan={2}>{exerciseTypeId == 1 ? "Observações" : "Exercícios a realizar"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    id="medicine"
                                    value={medicine}
                                    onChange={(event) => { setMedicine(event.target.value) }}
                                />
                            </td>
                            <td colSpan={2}>
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
                    <Button className='change-btn' variant="danger" onClick={() => setEditing(false)}>
                        <FontAwesomeIcon className='icon' icon={faXmark} /> Cancelar
                    </Button>
                    <Button className='change-btn' variant="success" onClick={postForm}>
                        <FontAwesomeIcon className='icon' icon={faFloppyDisk} /> Publicar
                    </Button>
                </div>
            </>
        )
    }

    return (
        <div>
            {editing ?
                <UtentePrescricoesItemsEdit prescription={prescription} staffData={staffData} exercisesData={exercisesData}
                    exerciseTypeData={exerciseTypeData} getPrescriptionsData={getPrescriptionsData} />
                :
                <UtentePrescricoesItemsView prescription={prescription} staffData={staffData} />
            }
        </div>
    )
}

export default UtentePrescricoesItems