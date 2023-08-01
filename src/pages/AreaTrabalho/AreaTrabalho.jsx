import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./AreaTrabalho.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SideBar from '../../components/SideBar/SideBar';

const AreaTrabalho = () => {
    return (
        <>
            <Header />
            <Container className='area-trabalho'>
                <Row>
                    <Col>
                        <SideBar />
                    </Col>
                    <Col>
                        <h1 className='title'>Area de trabalho</h1>
                    </Col>
                </Row>
            </Container>

            <Footer />
        </>
    )
}

export default AreaTrabalho