import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Container, Row, Col, Image } from 'react-bootstrap';
import "./Home.css";

const Home = () => {
    return (
        <>
            <motion.div
                className='Home'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
            >
                <div className='project-info'>
                    <Container>
                        <Row>
                            <div className='page-title'>
                                <h1>Capacita Aplicação Web</h1>
                            </div>
                        </Row>
                        <Row className="justify-content-center">
                            <Col className='project-info-content' xs={9} md={4}>
                                <a href="https://www.flaticon.com"><Image className='img-fluid project-info-image' src="src\assets\fundamentos_icon.png" alt="Fundamentos" /></a>
                                <h3>Fundamentos</h3>
                                <span>Projeto no âmbito do Laboratório LabSi do Instituto Politécnico de Beja </span>
                            </Col>
                            <Col className='project-info-content' xs={9} md={4}>
                                <a href="https://www.flaticon.com"><Image className='img-fluid project-info-image' src="src\assets\metodologia_icon.png" alt="Metedologia" /></a>
                                <h3>Metedologia</h3>
                                <span>Aplicação e Estudo de métricas baseadas em exercícios da Bateria de Fullerton</span>
                            </Col>
                            <Col className='project-info-content' xs={9} md={4}>
                                <a href="https://www.flaticon.com"><Image className='img-fluid project-info-image' src="src\assets\objetivo_icon.png" alt="Objetivo" /></a>
                                <h3>Objetivo</h3>
                                <span>Melhoria da condição física dos Idosos</span>
                            </Col>
                        </Row>
                    </Container>
                </div >
            </motion.div>
        </>

    )
}

export default Home