import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Image } from 'react-bootstrap';
import "./Home.css";
import Footer from '/src/components/Footer/Footer.jsx';
import Header from '../../components/Header/Header';

const Home = () => {
    return (
        <>
            <Header />
            <div className='project-info'>
                <div className='page-title'>
                    <h1>Capacita Aplicação Web</h1>
                </div>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <Image className='img-fluid project-info-image' src="src\assets\fundamentos_icon.png" alt="Fundamentos" width={350} />
                            <h3>Fundamentos</h3>
                            <span>Projeto no âmbito do Laboratório LabSi do Instituto Politécnico de Beja </span>
                        </Col>
                        <Col xs={6} md={4}>
                            <Image className='img-fluid project-info-image' src="src\assets\metodologia_icon.png" alt="Fundamentos" width={350} />
                            <h3>Metedologia</h3>
                            <span>Aplicação e Estudo de métricas baseadas em exercícios da Bateria de Fullerton</span>
                        </Col>
                        <Col xs={6} md={4}>
                            <Image className='img-fluid project-info-image' src="src\assets\objetivo_icon.png" alt="Fundamentos" width={350} />
                            <h3>Objetivo</h3>
                            <span>Melhoria da condição física dos Idosos</span>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div >
        </>

    )
}

export default Home