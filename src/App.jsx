import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Contatos from "./pages/Contatos/Contatos";
import Auth from "./pages/Auth/Auth";
import AreaTrabalho from "./pages/AreaTrabalho/AreaTrabalho";
import NoPage from "./pages/NoPage/NoPage";
import Utentes from "./components/AreaTrabalhoComponents/UtentesComponents/Utentes/Utentes";
import AddUtente from "./components/AreaTrabalhoComponents/UtentesComponents/AddUtente/AddUtente";
import EditUtente from "./components/AreaTrabalhoComponents/UtentesComponents/EditUtente/EditUtente";
import UtenteCalendario from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteCalendario/UtenteCalendario";
import UtenteHistorico from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteHistorico/UtenteHistorico";
import UtenteMedicacao from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteMedicacao/UtenteMedicacao";
import UtenteDadosFisicos from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteDadosFisicos/UtenteDadosFisicos";
import UtenteTestes from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteTestes/UtenteTestes";
import UtenteRelatorios from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteRelatorios/UtenteRelatorios";
import UtentePrescricoes from "./components/AreaTrabalhoComponents/UtentesComponents/UtentePrescricoes/UtentePrescricoes";
import UtenteAnalise from "./components/AreaTrabalhoComponents/UtentesComponents/UtenteAnalise/UtenteAnalise";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LivroVerde from "./components/AreaTrabalhoComponents/LivroVerde/LivroVerde";
import AnaliseEstatistica from "./components/AreaTrabalhoComponents/AnaliseEstatistica/AnaliseEstatistica";
import PerfilPessoal from "./components/AreaTrabalhoComponents/PerfilPessoal/PerfilPessoal";
import Utente from "./components/AreaTrabalhoComponents/UtentesComponents/Utente/Utente";
import UtentesList from "./components/AreaTrabalhoComponents/UtentesComponents/UtentesList/UtentesList";
import TecnicosEF from "./components/AreaTrabalhoComponents/TecnicosEF/TecnicosEF";
import Instituicoes from "./components/AreaTrabalhoComponents/Instituicoes/Instituicoes";
import AddInstituicao from "./components/AreaTrabalhoComponents/InstituicoesComponents/AddInstituicao/AddInstituicao";

export default function App() {
  const isAuthenticated = sessionStorage.getItem('token') ? true : false;
  const isAdmin = sessionStorage.getItem('email') == "admin@gmail.com" ? true : false;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Sobre />} />
        <Route path="/contacts" element={<Contatos />} />
        <Route path="/work_area" element={isAuthenticated ? <AreaTrabalho /> : <Auth />} >
          <Route path="green_book" element={isAuthenticated ? <LivroVerde /> : <Auth />} />
          <Route path="statistics" element={isAuthenticated ? <AnaliseEstatistica /> : <Auth />} />
          <Route path="personal_profile" element={isAuthenticated ? <PerfilPessoal /> : <Auth />} />

          <Route path="technics_ef" element={isAdmin ? <TecnicosEF /> : <Auth />} />
          <Route path="institutions" element={isAdmin ? <Instituicoes /> : <Auth />} >
            <Route path="add" element={isAuthenticated ? <AddInstituicao /> : <Auth />} />
          </Route>

          <Route path="patients" element={isAuthenticated ? <Utentes /> : <Auth />} >
            <Route path="list" element={isAuthenticated ? <UtentesList /> : <Auth />} />
            <Route path="add" element={isAuthenticated ? <AddUtente /> : <Auth />} />
            <Route path=":id/edit" element={isAuthenticated ? <EditUtente /> : <Auth />} />
            <Route path=":id" element={isAuthenticated ? <Utente /> : <Auth />}>
              <Route path="calendar" element={isAuthenticated ? <UtenteCalendario /> : <Auth />} />
              <Route path="history" element={isAuthenticated ? <UtenteHistorico /> : <Auth />} />
              <Route path="medication" element={isAuthenticated ? <UtenteMedicacao /> : <Auth />} />
              <Route path="physical_data" element={isAuthenticated ? <UtenteDadosFisicos /> : <Auth />} />
              <Route path="tests_performed" element={isAuthenticated ? <UtenteTestes /> : <Auth />} />
              <Route path="reports" element={isAuthenticated ? <UtenteRelatorios /> : <Auth />} />
              <Route path="prescriptions" element={isAuthenticated ? <UtentePrescricoes /> : <Auth />} />
              <Route path="analysis" element={isAuthenticated ? <UtenteAnalise /> : <Auth />} />
            </Route>
          </Route>
        </Route>
        <Route path="auth" element={isAuthenticated ? <AreaTrabalho /> : <Auth />} />
        <Route path="*" element={<NoPage />} />
      </Route >
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

const Root = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      {/* <div>
        <Footer />
      </div> */}
    </>
  )
}

