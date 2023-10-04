import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtentesListItems.css";
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons'

const UtentesItems = ({ patient, removePatient, staffType }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [show, setShow] = useState(false);


    const tooltip1 = (
        <Tooltip id="tooltip">
            <strong>Informações Utente</strong>
        </Tooltip>
    );

    const tooltip2 = (
        <Tooltip id="tooltip">
            <strong>Editar Utente</strong>
        </Tooltip>
    );

    const tooltip3 = (
        <Tooltip id="tooltip">
            <strong>Remover Utente</strong>
        </Tooltip>
    );

    return (
        <>
            <tr>
                <th scope="row">{patient.id}</th>
                <td>{patient.first_name + " " + patient.last_name}</td>
                <td>{patient.NIF}</td>
                <td>{patient.NISS}</td>
                <td>{patient.location.name}</td>
                <td className='table-icons'>
                    <OverlayTrigger placement="top" overlay={tooltip1}>
                        <FontAwesomeIcon icon={faUser} onClick={() => { navigate(`/work_area/patients/${patient.id}/prescriptions`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip2}>
                        <FontAwesomeIcon className='icon' icon={faPenToSquare} style={{ color: "#f08000", }} onClick={() => { navigate(`/work_area/patients/${patient.id}/edit`) }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip3}>
                        <FontAwesomeIcon className='icon' onClick={handleShowModal} icon={faUserXmark} style={{ color: "#c70000", }} />
                    </OverlayTrigger>
                </td>
            </tr>
            <Modal className="my-modal" centered show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Remover Utente</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Tem a certeza de que quer remover "${patient.first_name + " " + patient.last_name}" da lista de utentes?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Não
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => removePatient(patient.id, (patient.first_name + " " + patient.last_name))}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UtentesItems