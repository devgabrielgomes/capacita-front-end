import React, { useState, useEffect, effectRan, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AddUtente.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const AddUtente = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const date = Date.now()
    const [gendersData, setGendersData] = useState([]);
    const [locationsData, setLocationsData] = useState([]);
    const [aidTypesData, setAidTypesData] = useState([]);
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {
            const getGenders = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}genders${PT}`, { headers })
                const data = await res.json()
                setGendersData(data)
            }

            const getLocations = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}locations${PT}`, { headers })
                const data = await res.json()
                setLocationsData(data)
            }

            const getAidTypes = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API}aidTypes${PT}`, { headers })
                const data = await res.json()
                setAidTypesData(data)
            }

            getGenders()
            getLocations()
            getAidTypes()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    return (
        <>
            <Row>
                <Col>
                    <h4>Inserir Utente</h4>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/patients/list') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o nome do utente" required />
                </Form.Group>

                <Form.Group className="mb-3 birthdate" controlId="birthdate">
                    <Form.Label>Data de nascimento</Form.Label>
                    <DatePicker className="date-picker"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        value={selectedDate}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Altura</Form.Label>
                    <Form.Control type="number" min="50" placeholder="Introduza a altura do utente em cm" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="number" min="30" placeholder="Introduza o peso do utente" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Genero</Form.Label>
                    <Form.Select>
                        {gendersData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lado dominante</Form.Label>
                    <Form.Select>
                        <option value={1}>Destro</option>
                        <option value={0}>Esquerdino</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="location_id">
                    <Form.Label>Tipo de Ajuda</Form.Label>
                    <Form.Select>
                        {aidTypesData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>NIF</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Introduza o NIF do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>NISS</Form.Label>
                    <Form.Control type="number" min="0" placeholder="Introduza o NIF do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="location_id">
                    <Form.Label>Localização do Lar</Form.Label>
                    <Form.Select>
                        {locationsData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>


                <Button variant="primary" type="submit">
                    Inserir Utente
                </Button>
            </Form>

        </>
    )
}

export default AddUtente