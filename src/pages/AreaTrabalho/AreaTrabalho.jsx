import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import "./AreaTrabalho.css";
import { Row, Col } from 'react-bootstrap';
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

                    <Col className='outlet' md={7} lg={7} xl={8} xxl={9}>
                        <Outlet />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AreaTrabalho