import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./EditInstituicao.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const EditInstituicao = () => {
    let params = useParams();
    let institutionId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [locationsData, setLocationsData] = useState([]);
    const [regionsData, setRegionsData] = useState([]);
    const [addingLocation, setAddingLocation] = useState(false);

    const [name, setName] = useState("");
    const [locationId, setLocationId] = useState(1);

    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [locationPostcode, setLocationPostcode] = useState("");
    const [locationRegionId, setLocationRegionId] = useState(1);

    /**
     * GET request to set locations data
     * @returns {Promise<void>}
     */
    const getLocations = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}locations${PT}`, { headers })
        const data = await res.json()
        setLocationsData(data)
    }

    /**
     * GET request to set regions data
     * @returns {Promise<void>}
     */
    const getRegions = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}regions${PT}`, { headers })
        const data = await res.json()
        setRegionsData(data)
    }

    /**
     * GET request to set institution data
     * @returns {Promise<void>}
     */
    const getInstitutionData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}institutions/${institutionId}${PT}`, { headers })
        const data = await res.json()
        setName(data.name)
        setLocationId(data.location.id)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getInstitutionData()
            getLocations()
            getRegions()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    /**
     * Function executed on post institution form submit
     * @param e
     * @returns {Promise<void>}
     */
    const putInstitutionForm = async (e) => {
        e.preventDefault()
        await editInstitution()
        navigate("/work_area/institutions")
    }

    /**
     * Function executed on post location form submit
     * @param e
     * @returns {Promise<void>}
     */
    const postLocationForm = async (e) => {
        e.preventDefault()
        await postLocation()
        getLocations()
    }

    /**
     * PUT request to add edit an institution
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const editInstitution = async (e) => {
        let institutionData = { 'name': name, 'location_id': locationId }

        const headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        };

        axios.put(`${API_LINK}institutions/${institutionId}`, institutionData, { headers })
            .then((response) => {
                toastSuccess(`A Instituição "${name}" foi editada com sucesso!`);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                toastError(`Não foi possível editar a Instituição "${name}" !`)
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
        axios.post(`${API_LINK}locations`, locationData, { headers })
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
                {!addingLocation ?
                    <>
                        <Col xs='4' md='4' lg='4'>
                            <h4>Editar Instituição</h4>
                        </Col>
                        <Col xs='8' md='8' lg='8' className='top-buttons'>
                            <Button className='add-location-btn' variant="primary" onClick={() => { setAddingLocation(true) }}><FontAwesomeIcon icon={faPlus} /> Adicionar localização</Button>
                            <Button variant="secondary" onClick={() => { navigate('/work_area/institutions') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista de Instituições</Button>
                        </Col>
                    </>
                    :
                    ""
                }
            </Row>

            {addingLocation ?
                <>
                    <Row>
                        <Col>
                            <h4>Inserir Localização</h4>
                        </Col>
                        <Col className='top-buttons'>
                            <Button variant="secondary" onClick={() => { setAddingLocation(false) }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar</Button>{' '}
                        </Col>
                    </Row>
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
                            Inserir Localização
                        </Button>
                    </Form>
                </>
                :
                <Form>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Introduza o nome da instituição" value={name} onChange={(event) => { setName(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="locationId">
                        <Form.Label>Localização</Form.Label>
                        <Form.Select value={locationId} onChange={(event) => { setLocationId(event.target.value) }}>
                            {locationsData.map((val, key) => {
                                return (
                                    <option key={key} value={val.id}>{val.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Button variant="success" type="submit" onClick={putInstitutionForm}>
                        Guardar Alterações
                    </Button>
                </Form>
            }
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

export default EditInstituicao