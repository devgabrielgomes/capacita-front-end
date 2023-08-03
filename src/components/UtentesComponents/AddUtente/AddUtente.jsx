import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AddUtente.css";
import { Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const AddUtente = () => {
    return (
        <>
            <h2>Inserir Utente</h2>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o nome do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Data de nascimento</Form.Label>
                    <Form.Control type="text" placeholder="Introduza a altura do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Altura</Form.Label>
                    <Form.Control type="text" placeholder="Introduza a altura do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o peso do utente" required />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddUtente