import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.css";
import { Link } from "react-router-dom"
// import { SideBarItems } from './SideBarItems';
import { Form, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUser, faChartColumn, faBook } from '@fortawesome/free-solid-svg-icons'
// import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { faChartColumn } from '@fortawesome/free-solid-svg-icons'
// import { faBook } from '@fortawesome/fontawesome-svg-core/import.macro'

const SideBarItems = [
    {
        title: "Perfil Pessoal",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "/area_trabalho/pessoal"
    },
    {
        title: "Utentes",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "/area_trabalho/utentes"
    },
    {
        title: "Análise Estatística",
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        link: "/area_trabalho/analise"
    },
    {
        title: "Livro Verde",
        icon: <FontAwesomeIcon icon={faBook} />,
        link: "/area_trabalho/livro"
    }
];

const SideBar = () => {
    return (
        <>
            {console.log(SideBarItems)}
            <div className='side-bar'>
                <ul>
                    {SideBarItems.map((val, key) => {
                        return (
                            <li
                                className='sidebar-item'
                                key={key}
                                onClick={() => { window.location.pathname = val.link }}>
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