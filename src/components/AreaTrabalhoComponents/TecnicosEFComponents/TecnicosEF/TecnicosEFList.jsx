import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TecnicosEFList.css";
import { useNavigate } from "react-router-dom"
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import TecnicosEFItems from './TecnicosEFItems/TecnicosEFItems';
import axios from 'axios';

const TecnicosEFList = () => {
    const navigate = useNavigate();
    const effectRan = useRef(false)
    const [staffData, setStaffData] = useState();
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * GET request to set staff data
     * @returns {Promise<void>}
     */
    const getStaff = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API_LINK}staff${PT}`, { headers })
        const data = await res.json()
        setStaffData(data)
    }

    /**
     * DELETE request to remove a technic
     * @param id
     * @param technicianName
     */
    function removeTechnician(id, technicianName) {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        axios.delete(`${API_LINK}staff/${id}`, { headers })
            .then(() => {
                getStaff()
                toastSuccess(`Técnico "${technicianName}" removido com sucesso do sistema!`)
            })
            .catch(({ response }) => {
                toastError(`Não foi possível remover o Técnico "${technicianName}" do sistema!`)
            })
    }

    useEffect(() => {
        if (effectRan.current === false && sessionStorage.getItem('token')) {
            getStaff()
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
                    <h2>Técnicos de EF</h2>
                </Col>
                <Col className='add-patient-btn'>
                    <Button variant="primary" onClick={() => { navigate('/work_area/technics_ef/add') }}><FontAwesomeIcon icon={faUserPlus} /> Adicionar Técnico de EF</Button>
                </Col>
            </Row>
            <input
                type="search"
                className="form-control search"
                placeholder="Introduza um membro da staff"
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nº</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Instituição</th>
                        <th scope="col">Email</th>
                        <th scope="col">Data de Nascimento</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {staffData && staffData.map((staff, key) => {
                        if (searchTerm === "") {
                            return <TecnicosEFItems key={key} staff={staff} removeTechnician={removeTechnician} />
                        } else if (
                            staff.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            staff.last_name.toLowerCase().includes(searchTerm.toLowerCase())
                        ) {
                            return <TecnicosEFItems key={key} staff={staff} removeTechnician={removeTechnician} />
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

export default TecnicosEFList