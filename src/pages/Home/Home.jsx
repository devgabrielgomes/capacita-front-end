import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import { Container, Row, Col, Image } from 'react-bootstrap';
import "./Home.css";
import fundamentosIcon from '/src/assets/fundamentos_icon.png';
import metodologiaIcon from '/src/assets/metodologia_icon.png';
import objetivoIcon from '/src/assets/objetivo_icon.png';

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
                                <a href="https://flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid project-info-image' src={fundamentosIcon} alt="Fundamentos" /></a>
                                <h3>Fundamentos</h3>
                                <span>Projeto no âmbito do Laboratório LabSi do Instituto Politécnico de Beja </span>
                            </Col>
                            <Col className='project-info-content' xs={9} md={4}>
                                <a href="https://flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid project-info-image' src={metodologiaIcon} alt="Metedologia" /></a>
                                <h3>Metodologia</h3>
                                <span>Aplicação e Estudo de métricas baseadas em exercícios da Bateria de Fullerton</span>
                            </Col>
                            <Col className='project-info-content' xs={9} md={4}>
                                <a href="https://flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid project-info-image' src={objetivoIcon} alt="Objetivo" /></a>
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