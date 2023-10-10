import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contatos.css";
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons'

const Contatos = () => {
    return (
        <Container className='contatos-info'>
            <Row>
                <Col md={4}>
                    <h1>Contatos</h1>
                    <h4><FontAwesomeIcon icon={faEnvelope} /> Email</h4>
                    <span>lbruno@ipbeja.pt</span>
                    <br></br>
                    <br></br>
                    <h4><FontAwesomeIcon icon={faMobileScreen} /> Telefone</h4>
                    <span>284 XXX XXX</span>
                    <br></br>
                    <span>964 XXX XXX</span>
                </Col>
                <Col>
                    <h2>Localização</h2>
                    {/* <iframe
                        className='maps-embedded'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d667.4685739299919!2d-7.875310163202045!3d38.0161103582953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1a7487076244d7%3A0xa61299486a3e9763!2sEscola%20Superior%20de%20Tecnologia%20e%20Gest%C3%A3o%20-%20Instituto%20Polit%C3%A9cnico%20de%20Beja!5e1!3m2!1spt-PT!2spt!4v1690891767758!5m2!1spt-PT!2spt"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Contatos