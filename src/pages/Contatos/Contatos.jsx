import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contatos.css";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer/Footer';


const Contatos = () => {
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {

            const getAids = async () => {
                const headers = { 'Authorization': TOKEN };
                const res = await fetch(API + 'aidTypes', { headers })
                const data = await res.json()
                console.log(data)
                if (data.length > 0) {
                    toastSuccess("Noice!");
                }
            }
            getAids()

            return () => {
                effectRan.current = true
            }
        }
    }, [])

    /**
         * Display a success toast with a specific message
         * @param message
         */
    function toastSuccess(message) {
        toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    /**
     * Display an error toast with a specific message
     * @param message
     */
    function toastError(message) {
        toast.error(`${message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }


    return (
        <>
            <Header />
            <Container className='contatos-info'>
                <Row>
                    <Col md={4}>
                        <h2>Contatos</h2>
                        <h3><FontAwesomeIcon icon={faEnvelope} /> Email</h3>
                        <span>lbruno@ipbeja.pt</span>
                        <h3><FontAwesomeIcon icon={faMobileScreen} /> Telefone</h3>
                        <span>284 XXX XXX</span>
                        <br></br>
                        <span>964 XXX XXX</span>
                    </Col>
                    <Col>
                        <h2>Localização</h2>
                        <iframe
                            className='maps-embedded'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d667.4685739299919!2d-7.875310163202045!3d38.0161103582953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1a7487076244d7%3A0xa61299486a3e9763!2sEscola%20Superior%20de%20Tecnologia%20e%20Gest%C3%A3o%20-%20Instituto%20Polit%C3%A9cnico%20de%20Beja!5e1!3m2!1spt-PT!2spt!4v1690891767758!5m2!1spt-PT!2spt"
                            style={{ border: 0 }}
                            allowfullscreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </Col>
                </Row>
            </Container>
            <Footer />
            <TostifyToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default Contatos