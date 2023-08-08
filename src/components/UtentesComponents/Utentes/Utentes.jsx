import React, { useEffect, useState, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Utentes.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import UtentesItems from './UtentesItems/UtentesItems';
import axios from 'axios';
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import AddUtente from '../AddUtente/AddUtente';

const Utentes = () => {
    const [patientsData, setPatientsData] = useState();
    // const effectRan = useRef(false)
    useEffect(() => {
        // if (effectRan.current === false) {
        // console.log(sessionStorage.getItem('token'))
        getPatients()

        // return () => {
        //     effectRan.current = true
        // }
        // }
    }, [])

    const getPatients = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(API + 'patients', { headers })
        const data = await res.json()
        setPatientsData(data)
    }

    function removePatient(id, patient_name) {
        const data = { "id": id };
        axios.delete(API + "patients", data)
            .then(() => {
                getPatients()
                toastSuccess(`You just removed "${patient_name ? patient_name : " a patient"}!`)
            })
            .catch(({ response }) => {
                toastError(`Unable to remove "${patient_name ? patient_name : " a patient"}!`)
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
                    <Button variant="primary" onClick={() => { window.location.href = '/area_trabalho/utentes/add'; }}><FontAwesomeIcon icon={faUserPlus} /> Adicionar Utente</Button>{' '}
                </Col>
            </Row>

            <input type="search" className="form-control search" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Introduza um utente"></input>
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
                    {patientsData != null && patientsData.length > 0 && patientsData.map((patient, key) => (
                        <>
                            <UtentesItems key={key} patient={patient} removePatient={removePatient} />
                        </>
                    ))}


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

export default Utentes