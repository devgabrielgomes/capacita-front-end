import React from 'react'
import { Container, Image } from 'react-bootstrap';
import noResults from '/src/assets/no-results.png';

const NoPage = () => {
    return (
        <>
            <Container>
                <h1>A seguinte página não existe!</h1>
                <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid rounded' src={noResults} alt="work image" width={500} /></a>
            </Container>
        </>
    )
}

export default NoPage