import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "./Sobre.css";
import { Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Sobre = () => {
    return (
        <>
            <Container className='container'>
                <h1>Sobre</h1>
                <span className='sobre-text'>É muito importante identificar a condição física do sénior para que ele tenha
                    uma vida autónoma e funcional. Para tal, a estação de avaliação CAPACITA baseia-se
                    na bateria de Fullerton, que é amplamente usada nesta área, permitindo automatizar
                    o processo de recolha de dados dos exercícios físicos aplicados ao utente. O sistema
                    poderá ser usado em lares, centros de dia, ginásios e em casa do sénior. O artigo
                    mostra a arquitetura, funcionalidade e o processo de desenvolvimento do sistema. Os
                    testes de usabilidade realizados com técnicos de exercício físico mostram que o
                    sistema é muito fácil de utilizar.
                </span>
            </Container>
        </>
    )
}

export default Sobre