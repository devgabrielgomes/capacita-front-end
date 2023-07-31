import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from '../../pages/Home/Home';
import Contatos from '../../pages/Contatos/Contatos';
import Sobre from '../../pages/Sobre/Sobre';
import Auth from '../../pages/Auth/Auth';
import AreaTrabalho from '../../pages/AreaTrabalho/AreaTrabalho';
import NoPage from '../../pages/NoPage/NoPage';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <>
            <Routes location={location} key={location.pathname}>
                <Route index element={<Home />} />
                <Route path="contatos" element={<Contatos />} />
                <Route path="sobre" element={<Sobre />} />
                <Route path="area_trabalho" element={<AreaTrabalho />} />
                <Route path="auth" element={<Auth />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </>
    )
}

export default AnimatedRoutes;