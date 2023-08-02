import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
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
    const [selectedCompoent, setSelectedComponent] = useState(<PerfilPessoal />)
    let email = sessionStorage.getItem('email');
    const effectRan = useRef(false)
    const [staffData, setStaffData] = useState();

    useEffect(() => {
        if (effectRan.current === false) {
            const getStaff = async () => {
                const headers = { 'Authorization': TOKEN };
                const res = await fetch(API + 'staff', { headers })
                const data = await res.json()
                console.log(data)
                setStaffData(data)
            }
            getStaff()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    function getUserInfo() {
        staffData.forEach(staff => {
            if (staff.user.email == email) {
                console.log(staff.user.id)
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('id', staff.user.id);
            }
        });
    }


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
            <Container className='area-trabalho'>
                <Row>
                    <Col md={3}>
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
                    </Col>

                    <Col md={8}>
                        <h1 className='title'>Área de trabalho</h1>
                        {selectedCompoent}
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default AreaTrabalho