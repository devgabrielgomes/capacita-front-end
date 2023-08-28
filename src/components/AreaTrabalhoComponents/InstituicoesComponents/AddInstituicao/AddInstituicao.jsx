import React, { useState, useEffect, effectRan, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AddInstituicao.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddInstituicao = () => {
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [locationsData, setLocationsData] = useState([]);
    const [regionsData, setRegionsData] = useState([]);
    const [addingLocation, setAddingLocation] = useState(false);

    const [name, setName] = useState("");
    const [locationId, setLocationId] = useState("");

    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [locationPostcode, setLocationPostcode] = useState("");
    const [locationRegionId, setLocationRegionId] = useState("");

    const getLocations = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}locations${PT}`, { headers })
        const data = await res.json()
        setLocationsData(data)
    }

    const getRegions = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}regions${PT}`, { headers })
        const data = await res.json()
        setRegionsData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getLocations()
            getRegions()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    const postInstitutionForm = async (e) => {
        e.preventDefault()
        await postInstitution()
        navigate("/work_area/institutions")
    }

    const postLocationForm = async (e) => {
        e.preventDefault()
        await postLocation()
        getLocations()
    }

    /**
     * POST request to add new institution
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postInstitution = async (e) => {
        let institutionData = { 'name': name, 'location_id': locationId }
        const headers = {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        };
        axios.post(`${API}institutions`, institutionData, { headers })
            .then((response) => {
                toastSuccess(`A Instituição "${name}" foi adicionada com sucesso ao sistema!`);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                toastError(`Não foi possível adicionar a Instituição "${name}" ao sistema!`)
            })
    }

    /**
     * POST request to add new location
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const postLocation = async (e) => {
        let locationData = { 'name': locationName, 'address': locationAddress, 'postcode': locationPostcode, 'region_id': locationRegionId }
        const headers = {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        };
        axios.post(`${API}locations`, locationData, { headers })
            .then((response) => {
                toastSuccess(`A localização "${name}" foi adicionada com sucesso ao sistema!`);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                toastError(`Não foi possível adicionar a localização "${name}" ao sistema!`)
            })
    }


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

    return (
        <>
            <Row>
                <Col>
                    <h4>Inserir Instituição</h4>
                </Col>
                {!addingLocation ?
                    <Col className='institutions-list-btn'>
                        <Button variant="secondary" onClick={() => { setAddingLocation(true) }}><FontAwesomeIcon icon={faPlus} />Adicionar localização</Button>{' '}
                    </Col> : ""
                }
                <Col className='institutions-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/institutions') }}><FontAwesomeIcon icon={faArrowLeft} />Voltar à lista</Button>{' '}
                </Col>
            </Row>

            {addingLocation ?
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome da cidade</Form.Label>
                        <Form.Control type="text" placeholder="Introduza a cidade" value={locationName} onChange={(event) => { setLocationName(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control type="text" placeholder="Introduza a morada" value={locationAddress} onChange={(event) => { setLocationAddress(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="postalCode">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control type="text" placeholder="Introduza o código postal" value={locationPostcode} onChange={(event) => { setLocationPostcode(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="locationRegionId">
                        <Form.Label>Região</Form.Label>
                        <Form.Select value={locationRegionId} onChange={(event) => { setLocationRegionId(event.target.value) }}>
                            {regionsData.map((val, key) => {
                                return (
                                    <option key={key} value={val.id}>{val.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={postLocationForm}>
                        Inserir Instituição
                    </Button>
                </Form>
                :
                ""
            }

            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o nome da instituição" value={name} onChange={(event) => { setName(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="aid_type_id">
                    <Form.Label>Localização</Form.Label>
                    <Form.Select value={locationId} onChange={(event) => { setLocationId(event.target.value) }}>
                        {locationsData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={postInstitutionForm}>
                    Inserir Instituição
                </Button>
            </Form>

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

export default AddInstituicao