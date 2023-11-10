import React, { useState } from 'react';
import "./TecnicosEFItems.css";
import { useNavigate } from "react-router-dom"
import { OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPenToSquare, faUserXmark } from '@fortawesome/free-solid-svg-icons'

const TecnicosEFItems = ({ staff, removeTechnician }) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

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
                        <FontAwesomeIcon icon={faUser} onClick={() => { navigate(`/work_area/technics_ef/${staff.id}`); }} />
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltip2}>
                        <FontAwesomeIcon className='icon' icon={faPenToSquare} style={{ color: "#f08000", }} onClick={() => { navigate(`/work_area/technics_ef/${staff.id}/edit`); }} />
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
                        Não
                    </Button>
                    <Button variant="btn btn-danger" onClick={() => removeTechnician(staff.id, (staff.first_name + " " + staff.last_name))}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default TecnicosEFItems