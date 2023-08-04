import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AddUtente.css";
import { Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const AddUtente = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const date = Date.now()


    // function createHeights() {
    //     const heights = [];
    //     var currentHeight = 1.5;
    //     for (let i; i < 50; i++) {
    //         currentHeight += 0.05;
    //         heights.push(currentHeight);
    //     }
    //     heights.forEach(element => {
    //         console.log(element)
    //     });
    // }

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
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        value={selectedDate}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Altura</Form.Label>
                    {/* <Form.Control type="text" placeholder="Introduza a altura do utente" required /> */}
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
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