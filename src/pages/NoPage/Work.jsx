import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Image } from 'react-bootstrap';

const Work = () => {
    return (
        <>
            <Container>
                <br />
                <h4>A seguinte secção ainda não foi implementada!</h4>
                <a href="https://www.flaticon.com/free-icons/pending" title="pending icons"><Image className='img-fluid rounded' src="/src/assets/work-in-progress.png" alt="work image" width={300} /></a>
            </Container>
        </>
    )
}

export default Work