import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./PerfilPessoal.css";
import { Link } from "react-router-dom"
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const PerfilPessoal = () => {

    const effectRan = useRef(false)
    const [staffData, setStaffData] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        if (effectRan.current === false && sessionStorage.getItem('token')) {
            const getStaff = async () => {
                const headers = { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') };
                const res = await fetch(API + 'staff', { headers })
                const data = await res.json()
                setStaffData(data[0])
                setName(data[0].first_name + " " + data[0].last_name)
                setEmail(data[0].user.email)
            }
            getStaff()

            return () => {
                effectRan.current = true
            }
        }
    }, [])


    return (
        <>
            <h1>Perfil Pessoal</h1>
            <h3>Bem-vindo, <b>{name}!</b></h3>
            <hr></hr>
            <h2>Informações Pessoais</h2>
            <p><b>Nome:</b> {name}</p>
            <p><b>Email:</b> {email}</p>
            <hr></hr>
        </>
    )
}

export default PerfilPessoal