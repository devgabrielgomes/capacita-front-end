import React from 'react'
import "./NoPage.css";
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';

const NoPage = () => {
    return (
        <>
            <Header />
            <h1>Esta página não existe!</h1>
        </>
    )
}

export default NoPage