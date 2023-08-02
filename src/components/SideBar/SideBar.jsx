import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.css";
import { Link } from "react-router-dom"
// import { SideBarItems } from './SideBarItems';
import { Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUser, faUsers, faChartColumn, faBook } from '@fortawesome/free-solid-svg-icons'
import PerfilPessoal from '../PerfilPessoal/PerfilPessoal';
import Utentes from '../UtentesComponents/Utentes/Utentes';
import AnaliseEstatistica from '../AnaliseEstatistica/AnaliseEstatistica';
import LivroVerde from '../LivroVerde/LivroVerde';
import AreaTrabalho from '../../pages/AreaTrabalho/AreaTrabalho';

const SideBar = () => {

    function handleClick(component) {
        <AreaTrabalho component={component} />
    }

    const SideBarItems = [
        {
            title: "Perfil Pessoal",
            icon: <FontAwesomeIcon icon={faUser} />,
            link: 1
        },
        {
            title: "Utentes",
            icon: <FontAwesomeIcon icon={faUsers} />,
            link: 2
        },
        {
            title: "Análise Estatística",
            icon: <FontAwesomeIcon icon={faChartColumn} />,
            link: 3
        },
        {
            title: "Livro Verde",
            icon: <FontAwesomeIcon icon={faBook} />,
            link: 4
        }
    ];


    return (
        <>
            <div className='side-bar'>
                <ul>
                    {SideBarItems.map((val, key) => {
                        return (
                            <li
                                className='sidebar-item'
                                key={key}
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
        </>

    );
}

export default SideBar