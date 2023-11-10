import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from "/src/pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Contatos from "./pages/Contatos/Contatos";
import Auth from "./pages/Auth/Auth";
import AreaTrabalho from "/src/pages/AreaTrabalho/AreaTrabalho";
import NoPage from "./pages/NoPage/NoPage";
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
import LivroVerde from "./components/AreaTrabalhoComponents/LivroVerde/LivroVerde";
import AnaliseEstatistica from "./components/AreaTrabalhoComponents/AnaliseEstatistica/AnaliseEstatistica";
import PerfilPessoal from "/src/components/AreaTrabalhoComponents/PerfilPessoal/PerfilPessoal";
import Utente from "./components/AreaTrabalhoComponents/UtentesComponents/Utente/Utente";
import UtentesList from "./components/AreaTrabalhoComponents/UtentesComponents/UtentesList/UtentesList";
import InstituicoesList from "./components/AreaTrabalhoComponents/InstituicoesComponents/InstituicoesList/InstituicoesList";
import AddInstituicao from "./components/AreaTrabalhoComponents/InstituicoesComponents/AddInstituicao/AddInstituicao";
import EditInstituicao from "./components/AreaTrabalhoComponents/InstituicoesComponents/EditInstituicao/EditInstituicao";
import Instituicao from "./components/AreaTrabalhoComponents/InstituicoesComponents/Instituicao/Instituicao";
import TecnicoEF from "./components/AreaTrabalhoComponents/TecnicosEFComponents/TecnicoEF/TecnicoEF";
import TecnicosEFList from "./components/AreaTrabalhoComponents/TecnicosEFComponents/TecnicosEF/TecnicosEFList";
import EditTecnicoEF from "./components/AreaTrabalhoComponents/TecnicosEFComponents/EditTecnicoEF/EditTecnicoEF";
import AddTecnicoEF from "./components/AreaTrabalhoComponents/TecnicosEFComponents/AddTecnicoEF/AddTecnicoEF";

export default function App() {
  const isAuth = sessionStorage.getItem('token') ? true : false;
  const isAdmin = sessionStorage.getItem('email') == "admin@gmail.com" ? true : false;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Sobre />} />
        <Route path="/contacts" element={<Contatos />} />
        <Route path="/work_area" element={isAuth ? <AreaTrabalho /> : <Auth />} >
          <Route path="/work_area/personal_profile" element={isAuth ? <PerfilPessoal /> : <Auth />} />
          <Route path="/work_area/green_book" element={isAuth ? <LivroVerde /> : <Auth />} />
          <Route path="/work_area/statistics" element={isAuth ? <AnaliseEstatistica /> : <Auth />} />
          <Route path="/work_area/technics_ef" element={isAdmin ? <TecnicosEFList /> : <Auth />} />
          <Route path="/work_area/technics_ef/:id" element={isAdmin ? <TecnicoEF /> : <Auth />} />
          <Route path="/work_area/technics_ef/add" element={isAdmin ? <AddTecnicoEF /> : <Auth />} />
          <Route path="/work_area/technics_ef/:id/edit" element={isAdmin ? <EditTecnicoEF /> : <Auth />} />
          <Route path="/work_area/institutions" element={isAdmin ? <InstituicoesList /> : <Auth />} />
          <Route path="/work_area/institutions/:id" element={isAdmin ? <Instituicao /> : <Auth />} />
          <Route path="/work_area/institutions/add" element={isAuth ? <AddInstituicao /> : <Auth />} />
          <Route path="/work_area/institutions/:id/edit" element={isAuth ? <EditInstituicao /> : <Auth />} />
          <Route path="/work_area/patients" element={isAuth ? <UtentesList /> : <Auth />} />
          <Route path="/work_area/patients/add" element={isAuth ? <AddUtente /> : <Auth />} />
          <Route path="/work_area/patients/:id/edit" element={isAuth ? <EditUtente /> : <Auth />} />
          <Route path="/work_area/patients/:id" element={isAuth ? <Utente /> : <Auth />}>
            <Route path="/work_area/patients/:id/calendar" element={isAuth ? <UtenteCalendario /> : <Auth />} />
            <Route path="/work_area/patients/:id/history" element={isAuth ? <UtenteHistorico /> : <Auth />} />
            <Route path="/work_area/patients/:id/medication" element={isAuth ? <UtenteMedicacao /> : <Auth />} />
            <Route path="/work_area/patients/:id/physical_data" element={isAuth ? <UtenteDadosFisicos /> : <Auth />} />
            <Route path="/work_area/patients/:id/tests_performed" element={isAuth ? <UtenteTestes /> : <Auth />} />
            <Route path="/work_area/patients/:id/reports" element={isAuth ? <UtenteRelatorios /> : <Auth />} />
            <Route path="/work_area/patients/:id/prescriptions" element={isAuth ? <UtentePrescricoes /> : <Auth />} />
            <Route path="/work_area/patients/:id/analysis" element={isAuth ? <UtenteAnalise /> : <Auth />} />
          </Route>
        </Route>
        <Route path="/auth" element={isAuth ? <AreaTrabalho /> : <Auth />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route >
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer
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
    </div>
  )
}

const Root = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

