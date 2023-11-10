import React from 'react'
import { Container, Image } from 'react-bootstrap';
import workImage from '/src/assets/work-in-progress.png';

const Work = () => {
    return (
        <>
            <Container>
                <br />
                <h4>A seguinte secção ainda não foi implementada!</h4>
                <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer"><Image className='img-fluid rounded' src={workImage} alt="work image" width={300} /></a>
            </Container>
        </>
    )
}

export default Work