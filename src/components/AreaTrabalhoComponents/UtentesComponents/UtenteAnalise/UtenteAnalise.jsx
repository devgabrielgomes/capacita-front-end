import { React, useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UtenteAnalise.css";
import { Form, Button, Container, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom';

const UtenteAnalise = () => {
    let params = useParams();
    let patientId = params.id;
    const effectRan = useRef(false)
    const [patientData, setPatientData] = useState({});
    var currentDate = new Date()

    const getPatientData = async () => {
        const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
        const res = await fetch(`${API}patients/${patientId}${PT}`, { headers })
        const data = await res.json()
        console.log(data)
        setPatientData(data)
    }

    useEffect(() => {
        if (effectRan.current === false) {
            getPatientData()
        }

        return () => {
            effectRan.current = true
        }
    }, [])

    if (patientData.birthdate != null) {
        var age = parseInt(currentDate.getFullYear()) - parseInt(patientData.birthdate.substring(0, 4));
        var heightInMeter = parseInt(patientData.height) * (10 ** (-2));
        var imc = (patientData.weight / (heightInMeter * heightInMeter)).toFixed(2);
        var estadoNutricional = "";
        if (imc < 18.5) {
            estadoNutricional = "Baixo Peso"
        } else if (imc >= 18.5 && imc <= 24.9) {
            estadoNutricional = "Peso Normal"
        } else if (imc >= 25 && imc <= 29.9) {
            estadoNutricional = "Excesso de Peso"
        } else if (imc >= 30) {
            estadoNutricional = "Obesidade"
        } else if (imc > 30 && imc <= 34.9) {
            estadoNutricional = "Obesidade Classe 1 (Moderada)"
        } else if (imc >= 35 && imc <= 39.9) {
            estadoNutricional = "Obesidade Classe 2 (Severa)"
        } else if (imc > 40) {
            estadoNutricional = "Obesidade Classe 3 (Mórbida)"
        }
    }

    return (
        <>
            <h2>Análise</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th colSpan={3}>{patientData.first_name} {patientData.last_name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <p><b>Idade:</b> {age} anos</p>
                            <p><b>Peso:</b> {patientData.weight} kg</p>
                            <p><b>Altura:</b> {patientData.height} cm</p>
                        </td>
                        <td><b>IMC:</b> {imc} </td>
                        <td><b>Estado Nutricional:</b> {estadoNutricional}</td>
                    </tr>
                </tbody>
            </Table>

        </>
    )
}

export default UtenteAnalise