import React, { useState, useEffect, effectRan, useRef, require } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./EditTecnicoEF.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import Work from "../../../../pages/NoPage/Work";

const EditTecnicoEF = () => {
    let params = useParams();
    let institutionId = params.id;
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [locationsData, setLocationsData] = useState([]);
    const [regionsData, setRegionsData] = useState([]);
    const [addingLocation, setAddingLocation] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState();
    const [userId, setUserId] = useState(1);
    const [locationId, setLocationId] = useState(1);

    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [locationPostcode, setLocationPostcode] = useState("");
    const [locationRegionId, setLocationRegionId] = useState(1);


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

    const getInstitutionData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}institutions/${institutionId}${PT}`, { headers })
        const data = await res.json()
        console.log(data)
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
         * Execute all the put requests needed to edit a patient in the system
         * @param e
         * @returns {Promise<void>}
         */
    const putInstitutionForm = async (e) => {
        e.preventDefault()
        await editInstitutions()
        navigate("/work_area/institutions")
    }

    const postLocationForm = async (e) => {
        e.preventDefault()
        await postLocation()
        getLocations()
    }


    const editInstitutions = async (e) => {
        let institutionData = { 'name': name, 'location_id': locationId }

        const headers = {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        };

        axios.put(`${API}institutions/${institutionId}`, institutionData, { headers })
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
                {!addingLocation ?
                    <>
                        <Col xs='4' md='4' lg='4'>
                            <h4>Editar Técnico de EF</h4>
                        </Col>
                        <Col xs='8' md='8' lg='8' className='top-buttons'>
                            <Button className='add-location-btn' variant="primary" onClick={() => { setAddingLocation(true) }}><FontAwesomeIcon icon={faPlus} /> Adicionar localização</Button>
                            <Button variant="secondary" onClick={() => { navigate('/work_area/technics_ef') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista de Técnicos de EF</Button>
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
                    <Work />
                    {/* <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="Introduza o nome" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Morada</Form.Label>
                        <Form.Control type="text" placeholder="Introduza o apelido" value={lastName} onChange={(event) => { setLastName(event.target.value) }} required />
                    </Form.Group>

                    <Form.Group className="mb-3 birthdate" controlId="birthdate">
                        <Form.Label>Data de nascimento</Form.Label>
                        <DatePicker className="date-picker"
                            dateFormat="yyyy-MM-dd"
                            selected={birthdate}
                            value={birthdate}
                            onChange={birthdate => { setBirthdate(birthdate) }}
                        />
                        <small id="emailHelp" className="form-text text-muted">Formato da Data: YYYY-MM-DD</small>
                    </Form.Group>

                    <Button variant="success" type="submit" onClick={putInstitutionForm}>
                        Guardar Alterações
                    </Button> */}
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

export default EditTecnicoEF