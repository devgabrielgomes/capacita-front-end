import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./InstituicoesItems.css";
import { Link, useNavigate } from "react-router-dom"
import { Navbar, Container, Nav, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faBuilding, faBuildingCircleXmark } from '@fortawesome/free-solid-svg-icons'

const InstituicoesItems = ({ institution, removeInstitution }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const [show, setShow] = useState(false);


    const tooltip1 = (
        <Tooltip id="tooltip">
            <strong>Informações Instituição</strong>
        </Tooltip>
    );

    const tooltip2 = (
        <Tooltip id="tooltip">
            <strong>Editar Instituição</strong>
        </Tooltip>
    );

    const tooltip3 = (
        <Tooltip id="tooltip">
            <strong>Remover Instituição</strong>
        </Tooltip>
    );

    return (
        <>
            <tr>
                <th scope="row">{institution.id}</th>
                <td>{institution.name}</td>
                <td>{institution.location.name}</td>
                <td>{institution.location.address}</td>
                <td>{institution.location.region.name}</td>
                <td className='table-icons'>
                    <OverlayTrigger placement="top" overlay={tooltip1}>
                        <FontAwesomeIcon icon={faBuilding} onClick={() => { navigate(`/work_area/institutions/${institution.id}`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip2}>
                        <FontAwesomeIcon className='icon' icon={faPenToSquare} style={{ color: "#f08000", }} onClick={() => { navigate(`/work_area/institutions/${institution.id}/edit`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip3}>
                        <FontAwesomeIcon className='icon' onClick={handleShowModal} icon={faBuildingCircleXmark} style={{ color: "#c70000", }} />
                    </OverlayTrigger>
                </td>
            </tr>
            <Modal className="my-modal" centered show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Remover Instituição</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Tem a certeza de que quer remover a instituição "${institution.name}" do sistema?`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        No
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => removeInstitution(institution.id, institution.name)}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default InstituicoesItems