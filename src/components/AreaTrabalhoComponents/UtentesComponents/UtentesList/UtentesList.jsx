import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentesList.css";
import { useNavigate } from "react-router-dom"
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import UtentesItems from './UtentesListItems/UtentesListItems';
import axios from 'axios';
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';

const UtentesList = () => {
    const [patientsData, setPatientsData] = useState();
    const [staffInstitution, setStaffInstitution] = useState("");
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPatients()
        getStaffInstitution()
    }, [])

    /**
     * GET request to set patients data
     * @returns {Promise<void>}
     */
    const getPatients = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(API + 'patients', { headers })
        const data = await res.json()
        setPatientsData(data)
    }

    /**
     * GET request to set staff institution data
     * @returns {Promise<void>}
     */

    const getStaffInstitution = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(API + 'staff/' + sessionStorage.getItem('id'), { headers })
        const data = await res.json()
        setStaffInstitution(data.location.name)
    }

    /**
     * DELETE request to remove a patient
     * @param id
     * @param patient_name
     */
    function removePatient(id, patient_name) {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        axios.delete(`${API}patients/${id}`, { headers })
            .then(() => {
                getPatients()
                toastSuccess(`O paciente "${patient_name}" foi removido com sucesso do sistema!`)
            })
            .catch(({ response }) => {
                toastError(`Não foi possível remover o paciente "${patient_name}" do sistema!`)
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
                    <h2>Utentes</h2>
                </Col>
                <Col className='add-patient-btn'>
                    <Button variant="primary" onClick={() => { navigate('/work_area/patients/add') }}><FontAwesomeIcon icon={faUserPlus} /> Adicionar Utente</Button>{' '}
                </Col>
            </Row>

            <input
                type="search"
                className="form-control search"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Introduza um utente ou instituição"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nº</th>
                        <th scope="col">Nome</th>
                        <th scope="col">NIF</th>
                        <th scope="col">NISS</th>
                        <th scope="col">Instituição</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {patientsData && patientsData.map((patient, key) => {
                        if (sessionStorage.getItem('id') == 1) {
                            if (searchTerm == "") {
                                return <UtentesItems key={key} patient={patient} removePatient={removePatient} />
                            } else if (
                                patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                patient.NIF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                patient.NISS.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                patient.location.name.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return <UtentesItems key={key} patient={patient} removePatient={removePatient} />
                            }
                        } else {
                            if (patient.location.name.toLowerCase().includes(staffInstitution.toLowerCase())) {
                                if (searchTerm == "") {
                                    return <UtentesItems key={key} patient={patient} removePatient={removePatient} />
                                } else if (
                                    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    patient.NIF.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    patient.NISS.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    patient.location.name.toLowerCase().includes(searchTerm.toLowerCase())
                                ) {
                                    return <UtentesItems key={key} patient={patient} removePatient={removePatient} />
                                }
                            }
                        }
                    })}
                </tbody>
            </table>
            <TostifyToastContainer
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

export default UtentesList