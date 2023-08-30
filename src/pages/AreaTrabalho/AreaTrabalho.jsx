import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "./AreaTrabalho.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import PerfilPessoal from '../../components/AreaTrabalhoComponents/PerfilPessoal/PerfilPessoal';
import { SideBarAdminItems, SideBarItems } from './AreaTrabalhoItems';

function AreaTrabalho() {
    const isAdmin = sessionStorage.getItem('email') == "admin@gmail.com" ? true : false;
    const navigate = useNavigate();
    var SideBarFinalItems = null;
    if (isAdmin) {
        SideBarFinalItems = SideBarAdminItems;
    } else {
        SideBarFinalItems = SideBarItems;
    }

    return (
        <>
            <div className='area-trabalho'>
                <Row className='area-trabalho-row'>
                    <Col md={4} lg={4} xl={3} xxl={2} className='side-bar-col'>
                        <div className='side-bar'>
                            <ul>
                                {SideBarFinalItems.map((val, key) => {
                                    return (
                                        <li
                                            className='sidebar-item'
                                            key={key}
                                            id={window.location.pathname.includes(val.link) ? "active" : ""}
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

                    <Col md={7} lg={7} xl={8} xxl={9}>
                        <h1 className='title'>Área de trabalho</h1>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AreaTrabalho