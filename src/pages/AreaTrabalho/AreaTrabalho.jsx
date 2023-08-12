import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "./AreaTrabalho.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PerfilPessoal from '../../components/AreaTrabalhoComponents/PerfilPessoal/PerfilPessoal';
import { SideBarItems } from './AreaTrabalhoItems';

function AreaTrabalho() {
    const navigate = useNavigate();

    return (
        <>
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
                                            id={window.location.pathname == val.link ? "active" : ""}
                                            onClick={() => { navigate(val.link); }}>
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

                    <Col md={10}>
                        <h1 className='title'>Área de trabalho</h1>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AreaTrabalho