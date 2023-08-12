import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentePrescricoes.css";
import DatePicker from "react-datepicker";
import { Form, Button, Container, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const UtentePrescricoesItems = ({ prescription, staffData, exerciseTypesData }) => {
    const date = Date.now()
    const [selectedDate, setSelectedDate] = useState(null);
    const [editing, setEditing] = useState(false)
    const [exerciseType, setExerciseType] = useState(1)
    const exerTypeSelect = document.getElementById('select-exe-type');

    const UtentePrescricoesItemsView = ({ prescription, staffData, exerciseTypesData }) => {
        return (
            <>
                <p><b>Autor:</b> {prescription.user.id}</p>
                <Button variant="warning" onClick={() => handleComponentClick()}>Editar</Button>{' '}
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Tipo de Prescrição</th>
                            <th>Exercícios</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{prescription.exercise.type.name}</td>
                            <td>
                                {prescription.exercise.attributes.length > 0 && prescription.exercise.attributes.map((val, key) => {
                                    return (
                                        <span key={key}>{val.name}<br /></span>
                                    )
                                })}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <b>Observações: </b>{prescription.exercise.description}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </>
        )
    }

    const UtentePrescricoesItemsEdit = ({ prescription, staffData, exerciseTypesData }) => {
        return (
            <>
                <p><b>Autor:</b> {prescription.user.id}</p>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Tipo de Prescrição</th>
                            {exerciseType == 1 ? <th>Data de realização</th> : <th>Exercícios</th>}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Form.Select id="select-exe-type" onChange={() => handleExerciseTypeChange()}>
                                    <option value={exerciseTypesData[0].id}>{exerciseTypesData[0].name}</option>
                                    <option value={exerciseTypesData[1].id}>{exerciseTypesData[1].name}</option>
                                </Form.Select>
                            </td>
                            <td> {exerciseType == 1 ?
                                <DatePicker className="date-picker"
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    value={selectedDate}
                                />
                                :
                                (prescription.exercise.attributes.length > 0 && prescription.exercise.attributes.map((val, key) => {
                                    return (
                                        <span key={key}>{val.name}<br /></span>
                                    )
                                })
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <b>Observações: </b>{prescription.exercise.description}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="danger" onClick={() => handleComponentClick()}>Cancelar</Button>{' '}
                <Button variant="success" onClick={() => handleComponentClick()}>Publicar</Button>{' '}
            </>
        )
    }

    function handleComponentClick() {
        (editing == false) ? setEditing(true) : setEditing(false);
    }

    function handleExerciseTypeChange() {
        (exerciseType == 1) ? setExerciseType(0) : setExerciseType(1);
        // setExerciseType(exerTypeSelect.options[exerTypeSelect.selectedIndex].value);
    }

    return (
        <>
            {editing ?
                <UtentePrescricoesItemsEdit prescription={prescription} staffData={staffData} exerciseTypesData={exerciseTypesData} />
                :
                <UtentePrescricoesItemsView prescription={prescription} staffData={staffData} exerciseTypesData={exerciseTypesData} />
            }
        </>
    )
}

export default UtentePrescricoesItems