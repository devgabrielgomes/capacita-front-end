import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./TecnicosEFItems.css";
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons'

const TecnicosEFItems = ({ staff, removeTechnician }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [show, setShow] = useState(false);


    const tooltip1 = (
        <Tooltip id="tooltip">
            <strong>Informações Técnico de EF</strong>
        </Tooltip>
    );

    const tooltip2 = (
        <Tooltip id="tooltip">
            <strong>Editar Técnico de EF</strong>
        </Tooltip>
    );

    const tooltip3 = (
        <Tooltip id="tooltip">
            <strong>Remover Técnico de EF</strong>
        </Tooltip>
    );

    return (
        <>
            <tr>
                <th scope="row">{staff.id}</th>
                <td>{staff.first_name + " " + staff.last_name}</td>
                <td>{staff.location.name}</td>
                <td>{staff.user.email}</td>
                <td>{staff.birthdate}</td>
                <td className='table-icons'>
                    <OverlayTrigger placement="top" overlay={tooltip1}>
                        <FontAwesomeIcon icon={faUser} onClick={() => { navigate(`/work_area/patients/${patient.id}/calendar`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip2}>
                        <FontAwesomeIcon className='icon' icon={faPenToSquare} style={{ color: "#f08000", }} onClick={() => { navigate(`/work_area/patients/${patient.id}/edit`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip3}>
                        <FontAwesomeIcon className='icon' onClick={handleShowModal} icon={faUserXmark} style={{ color: "#c70000", }} />
                    </OverlayTrigger>
                </td>
            </tr>
            <Modal className="my-modal" centered show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Remover Técnico</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Tem a certeza de que quer remover o técnico "${staff.first_name + " " + staff.last_name}" do sistema?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => removeTechnician(staff.id, (staff.first_name + " " + staff.last_name))}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TecnicosEFItems