import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EditUtente.css";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from 'react-toastify';
import axios from "axios";

const EditUtente = () => {
    let params = useParams();
    let patientId = params.id;
    const navigate = useNavigate();
    const [gendersData, setGendersData] = useState([]);
    const [locationsData, setLocationsData] = useState([]);
    const [aidTypesData, setAidTypesData] = useState([]);
    const [patientData, setPatientData] = useState([]);
    const [staffLocationName, setStaffLocationName] = useState("");
    const effectRan = useRef(false)

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState();
    const [nif, setNif] = useState("");
    const [niss, setNiss] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [email, setEmail] = useState("");
    const [rightHanded, setRightHanded] = useState(0);
    const [gender, setGender] = useState(1);
    const [locationId, setLocationId] = useState(0);
    const [aidTypeId, setAidTypeId] = useState(1);
    const [picture, setPicture] = useState({});

    /**
     * Set a picture file
     * @param e
     */
    const uploadPicture = (e) => {
        setPicture({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0]
        })
    }

    /**
     * Function executed on post patient form submit
     * @param e
     * @returns {Promise<void>}
     */
    const postForm = async (e) => {
        e.preventDefault()
        editPatient()
    }

    /**
     * PUT request to edit a patient
     * @async
     * @param e
     * @returns {Promise<void>}
     */
    const editPatient = async (e) => {
        const finalPatientData = new FormData()
        finalPatientData.append('first_name', firstName)
        finalPatientData.append('last_name', lastName)
        finalPatientData.append('birthdate', birthdate.toISOString().slice(0, 10).replace(/-/g, "-"))
        finalPatientData.append('NIF', nif)
        finalPatientData.append('NISS', niss)
        finalPatientData.append('weight', weight)
        finalPatientData.append('height', height)
        finalPatientData.append('email', email)
        finalPatientData.append('right_handed', rightHanded)
        finalPatientData.append('gender_id', gender)
        finalPatientData.append('location_id', locationId)
        finalPatientData.append('aid_type_id', aidTypeId)
        finalPatientData.append('picture', picture.pictureAsFile)

        const headers = {
            "Content-Type": "multipart/form-data",
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        };

        axios.put(`${API_LINK}patients/${patientId}`, finalPatientData, { headers })
            .then((response) => {
                navigate("/work_area/patients")
                toastSuccess(`O utente "${firstName} ${lastName}" foi editado com sucesso!`);
            })
            .catch(function (error) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                toastError(`Não foi possível editar o paciente "${firstName} ${lastName}" !`)
            })
    }


    useEffect(() => {
        if (effectRan.current === false) {
            const getPatientData = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API_LINK}patients/${patientId}${PT}`, { headers })
                const data = await res.json()
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setBirthdate(moment(data.birthdate, 'YYYY-MM-DD').toDate())
                setHeight(data.height)
                setWeight(data.weight)
                setGender(data.gender)
                setRightHanded(data.right_handed)
                setAidTypeId(data.aid_type.id)
                setNif(data.NIF)
                setNiss(data.NISS)
                setLocationId(data.location.id)
                setEmail(data.email)
                setPicture(data.picture)
                setPatientData(data)
            }

            /**
             * GET request to set genders data
             * @returns {Promise<void>}
             */
            const getGenders = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API_LINK}genders${PT}`, { headers })
                const data = await res.json()
                setGendersData(data)
            }

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
             * GET request to set aid types data
             * @returns {Promise<void>}
             */
            const getAidTypes = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API_LINK}aidTypes${PT}`, { headers })
                const data = await res.json()
                setAidTypesData(data)
            }

            /**
             * GET request to set staff institution data
             * @returns {Promise<void>}
             */
            const getStaffInstitution = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(`${API_LINK}staff/${sessionStorage.getItem('id')}`, { headers })
                const data = await res.json()
                setStaffLocationName(data.location.name)
            }

            getGenders()
            getLocations()
            getAidTypes()
            getPatientData()
            getStaffInstitution()

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

    return (
        <>
            <Row>
                <Col>
                    <h4>Editar Utente</h4>
                </Col>
                <Col className='patients-list-btn'>
                    <Button variant="secondary" onClick={() => { navigate('/work_area/patients') }}><FontAwesomeIcon icon={faArrowLeft} /> Voltar à lista</Button>{' '}
                </Col>
            </Row>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o nome do utente" value={firstName} onChange={(event) => { setFirstName(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="last_name">
                    <Form.Label>Apelido</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o apelido do utente" value={lastName} onChange={(event) => { setLastName(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3 birthdate" controlId="birthdate">
                    <Form.Label>Data de nascimento</Form.Label>
                    <DatePicker className="date-picker"
                        dateFormat="yyyy-MM-dd"
                        selected={birthdate}
                        value={birthdate}
                        onChange={birthdate => { setBirthdate(birthdate) }}
                    />
                    <small id="emailHelp" className="form-text text-muted">Formato da Data: AAAA-MM-DD</small>
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Altura</Form.Label>
                    <Form.Control type="number" placeholder="Introduza a altura do utente" value={height} onChange={(event) => { setHeight(event.target.value) }} required />
                    <small id="heightHelp" className="form-text text-muted">Unidade da Altura: cm</small>
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="number" placeholder="Introduza o peso do utente" value={weight} onChange={(event) => { setWeight(event.target.value) }} required />
                    <small id="weightHelp" className="form-text text-muted">Unidade do Peso: kg</small>
                </Form.Group>

                <Form.Group className="mb-3" controlId="gender_id">
                    <Form.Label>Género</Form.Label>
                    <Form.Select value={gender} onChange={(event) => { setGender(event.target.value) }}>
                        {gendersData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lado dominante</Form.Label>
                    <Form.Select value={rightHanded} onChange={(event) => { setRightHanded(event.target.value) }}>
                        <option value={1}>Destro</option>
                        <option value={0}>Esquerdino</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="aid_type_id">
                    <Form.Label>Tipo de Ajuda</Form.Label>
                    <Form.Select value={aidTypeId} onChange={(event) => { setAidTypeId(event.target.value) }}>
                        {aidTypesData.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        })}
                    </Form.Select>
                </Form.Group>


                <Form.Group className="mb-3" controlId="nif">
                    <Form.Label>NIF</Form.Label>
                    <Form.Control type="text" maxLength="9" placeholder="Introduza o NIF do utente" value={nif} onChange={(event) => { setNif(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="niss">
                    <Form.Label>NISS</Form.Label>
                    <Form.Control type="text" maxLength="9" placeholder="Introduza o NIF do utente" value={niss} onChange={(event) => { setNiss(event.target.value) }} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="location_id">
                    {sessionStorage.getItem('id') == 1 ?
                        <>
                            <Form.Label>Localização</Form.Label>
                            <Form.Select value={locationId} onChange={(event) => { setLocationId(event.target.value) }} >
                                {locationsData.map((val, key) => {
                                    return (
                                        <option key={key} value={val.id}>{val.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </>
                        :
                        <>
                            <Form.Label>Localização: {staffLocationName}</Form.Label>
                        </>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Introduza o email do utente" value={email} onChange={(event) => { setEmail(event.target.value) }} required />
                </Form.Group>


                <Form.Group className="mb-3" controlId="photo">
                    <Form.Label>Foto</Form.Label>
                    <br></br>
                    <input type="file" name="file" onChange={uploadPicture} />
                </Form.Group>


                <Button variant="primary" type="submit" onClick={postForm}>
                    Editar Utente
                </Button>
            </Form>
        </>
    )
}

export default EditUtente