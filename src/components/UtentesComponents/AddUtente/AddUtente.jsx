import React, { useState, useEffect, effectRan, useRef } from "react";
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
    const [gendersData, setGendersData] = useState();
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {
            const getGenders = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(API + 'genders', { headers })
                const data = await res.json()
                console.log(data)
                setGendersData(data)
            }
            getGenders()

            return () => {
                effectRan.current = true
            }
        }
    }, [])



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

                <Form.Group className="mb-3 birthdate" controlId="birthdate">
                    <Form.Label>Data de nascimento</Form.Label>
                    <DatePicker className="date-picker"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        value={selectedDate}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Altura</Form.Label>
                    <Form.Control type="text" placeholder="Introduza a altura do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Peso</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o peso do utente" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Genero</Form.Label>
                    <Form.Select>
                        {gendersData && gendersData.map(obj => {
                            <option value={obj.name} selected={obj.id}>{obj.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Lado dominante</Form.Label>
                    <Form.Select>
                        <option>Destro</option>
                        <option>Esquerdino</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>NIF</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o NIF do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>NISS</Form.Label>
                    <Form.Control type="text" placeholder="Introduza o NIF do utente" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Morada</Form.Label>
                    <Form.Control type="text" placeholder="Introduza a morada do utente" required />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </>
    )
}

export default AddUtente