import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LivroVerde.css";
import { Image } from 'react-bootstrap';

const LivroVerde = () => {
    return (
        <>
            <h2>Livro Verde</h2>
            <br />
            <h4>A seguinte secção ainda não foi implentada!</h4>
            <Image className='img-fluid rounded' src="/src/assets/work-in-progress.png" alt="work image" width={300} />
        </>
    )
}

export default LivroVerde