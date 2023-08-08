import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Contatos from "./pages/Contatos/Contatos";
import Auth from "./pages/Auth/Auth";
import AreaTrabalho from "./pages/AreaTrabalho/AreaTrabalho";
import AddUtente from "./components/UtentesComponents/AddUtente/AddUtente";
import NoPage from "./pages/NoPage/NoPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/contatos" element={<Contatos />} />
      <Route path="/area_trabalho" element={sessionStorage.getItem('token') ? <AreaTrabalho /> : <Auth />} />
      <Route path="/auth" element={sessionStorage.getItem('token') ? <AreaTrabalho /> : <Auth />} />
      <Route path="/area_trabalho/utentes/add" element={<AddUtente />} />
      <Route path="*" element={<NoPage />} />
    </>
  ))

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}
export default App
