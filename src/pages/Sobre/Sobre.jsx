import React from 'react'
import "./Sobre.css";
import { Container, Image, Row } from 'react-bootstrap';
import eldersSport from '/src/assets/sport.jpg';

const Sobre = () => {
    return (
        <>
            <Container className='container'>
                <h1>Sobre</h1>
                <Row>
                    <span className='about-text'>É muito importante identificar a condição física do sénior para que ele tenha
                        uma vida autónoma e funcional. Para tal, a estação de avaliação CAPACITA baseia-se
                        na bateria de Fullerton, que é amplamente usada nesta área, permitindo automatizar
                        o processo de recolha de dados dos exercícios físicos aplicados ao utente. O sistema
                        poderá ser usado em lares, centros de dia, ginásios e em casa do sénior.
                        <p /> O artigo mostra a arquitetura, funcionalidade e o processo de desenvolvimento do sistema. Os
                        testes de usabilidade realizados com técnicos de exercício físico mostram que o
                        sistema é muito fácil de utilizar.
                    </span>
                </Row>
                <Row className='image-row'>
                    <Image className='img-fluid rounded-5' src={eldersSport} alt="idosos" />
                </Row>
            </Container>
        </>
    )
}

export default Sobre