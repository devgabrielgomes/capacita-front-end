import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "./AreaTrabalho.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers, faChartColumn, faBook } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PerfilPessoal from '../../components/PerfilPessoal/PerfilPessoal';
import Utentes from '../../components/UtentesComponents/Utentes/Utentes';
import AnaliseEstatistica from '../../components/AnaliseEstatistica/AnaliseEstatistica';
import LivroVerde from '../../components/LivroVerde/LivroVerde';

function AreaTrabalho() {
    const [selectedComponent, setSelectedComponent] = useState(<PerfilPessoal />)
    function handleClick(component) {
        setSelectedComponent(component)
    }

    const SideBarItems = [
        {
            title: "Perfil Pessoal",
            icon: <FontAwesomeIcon icon={faUser} />,
            link: <PerfilPessoal />
        },
        {
            title: "Utentes",
            icon: <FontAwesomeIcon icon={faUsers} />,
            link: <Utentes />
        },
        {
            title: "Análise Estatística",
            icon: <FontAwesomeIcon icon={faChartColumn} />,
            link: <AnaliseEstatistica />
        },
        {
            title: "Livro Verde",
            icon: <FontAwesomeIcon icon={faBook} />,
            link: <LivroVerde />
        }
    ];

    return (
        <>
            <Header />
            <div className='area-trabalho'>
                <Row className='area-trabalho-row'>
                    <Col md={2} className='side-bar-col'>
                        <div className='side-bar'>
                            <ul>
                                {SideBarItems.map((val, key) => {
                                    return (
                                        <li
                                            className='sidebar-item'
                                            key={key}
                                            id={val.link.type == selectedComponent.type ? "active" : ""}
                                            onClick={() => { handleClick(val.link) }}>
                                            <div className='sidebar-item-icon'>
                                                {val.icon}
                                            </div>
                                            <div className='sidebar-item-title'>
                                                {val.title}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </Col>

                    <Col md={8}>
                        <h1 className='title'>Área de trabalho</h1>
                        {selectedComponent}
                    </Col>
                </Row>
            </div>

            <Footer />
        </>
    )
}

export default AreaTrabalho