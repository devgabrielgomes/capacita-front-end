import React, { useEffect, useRef } from 'react';
import "./Contatos.css";
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Header from '../../components/Header/Header';
import { ToastContainer as TostifyToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contatos = () => {
    const effectRan = useRef(false)
    useEffect(() => {
        if (effectRan.current === false) {

            const getAids = async () => {
                const headers = { 'Authorization': 'Bearer 5|P6IZFoK7W770ifSN2aLPcQYlts0q9SkzoAvneciZ' };
                const res = await fetch('http://labsi2.ipbeja.pt/capacita-api/api/aidTypes', { headers })
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
            <h1>Contatos</h1>
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