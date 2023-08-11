import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Utentes.css";
import { Outlet } from 'react-router-dom';
import UtentesList from '../UtentesList/UtentesList';
const Utentes = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default Utentes