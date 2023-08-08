import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from "framer-motion";
import "./NoPage.css";
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const NoPage = () => {
    return (
        <>
            <Header />
            <motion.div
                className="wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <h1>Esta página não existe!</h1>
                <Footer />
            </motion.div>
        </>
    )
}

export default NoPage