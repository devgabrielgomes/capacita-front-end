import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Instituicoes.css";
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import InstituicoesItems from './InstituicoesItems';
import axios from 'axios';

const Instituicoes = () => {
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [institutionsData, setInstitutionsData] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    const getInstitutions = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}institutions${PT}`, { headers })
        const data = await res.json()
        console.log(data)
        setInstitutionsData(data)
    }

    function removeInstitution(id, institutionName) {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        axios.delete(`${API}institutions/${id}`, { headers })
            .then(() => {
                getInstitutions()
                toastSuccess(`Instituição "${institutionName}" removida com sucesso do sistema!`)
            })
            .catch(({ response }) => {
                toastError(`Não foi possível remover a Instituição "${institutionName}" do sistema!`)
            })
    }

    useEffect(() => {
        if (effectRan.current === false && sessionStorage.getItem('token')) {
            getInstitutions()
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
                    <h2>Instituições</h2>
                </Col>
                <Col className='add-patient-btn'>
                    <Button variant="primary" onClick={() => { navigate('/work_area/institutions/add') }}><FontAwesomeIcon icon={faPlus} /> Adicionar Instituição</Button>{' '}
                </Col>
            </Row>
            <input
                type="search"
                className="form-control search"
                placeholder="Introduza uma instituição"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nº</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Localização</th>
                        <th scope="col">Morada</th>
                        <th scope="col">Região</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {institutionsData && institutionsData.map((institution, key) => {
                        if (searchTerm === "") {
                            return <InstituicoesItems key={key} institution={institution} removeInstitution={removeInstitution} />
                        } else if (
                            institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            institution.location.region.name.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return <InstituicoesItems key={key} institution={institution} removeInstitution={removeInstitution} />
                        }
                    })}
                </tbody>
            </table>
            <Outlet />
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

export default Instituicoes