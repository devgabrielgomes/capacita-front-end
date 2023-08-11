import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./SideBar.css";
import { Link } from "react-router-dom"
// import { SideBarItems } from './SideBarItems';
import { Form, Button, Container } from 'react-bootstrap';
import AreaTrabalho from '../../pages/AreaTrabalho/AreaTrabalho';

const SideBar = () => {

    function handleClick(component) {
        <AreaTrabalho component={component} />
    }


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