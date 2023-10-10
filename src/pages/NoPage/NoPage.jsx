import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image } from 'react-bootstrap';
import noResults from '/src/assets/no-results.png';

const NoPage = () => {
    return (
        <>
            <Container>
                <h1>A seguinte página não existe!</h1>
                <Image className='img-fluid rounded' src={noResults} alt="work image" width={500} />
            </Container>
        </>
    )
}

export default NoPage