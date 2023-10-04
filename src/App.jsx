import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Contatos from "./pages/Contatos/Contatos";
import Auth from "./pages/Auth/Auth";
import AreaTrabalho from "./pages/AreaTrabalho/AreaTrabalho";
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
import PerfilPessoal from "./components/AreaTrabalhoComponents/PerfilPessoal/PerfilPessoal";
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
          <Route path="personal_profile" element={isAuthenticated ? <PerfilPessoal /> : <Auth />} />
          <Route path="green_book" element={isAuthenticated ? <LivroVerde /> : <Auth />} />
          <Route path="statistics" element={isAuthenticated ? <AnaliseEstatistica /> : <Auth />} />
          <Route path="technics_ef" element={isAdmin ? <TecnicosEFList /> : <Auth />} />
          <Route path="technics_ef/:id" element={isAdmin ? <TecnicoEF /> : <Auth />} />
          <Route path="technics_ef/add" element={isAdmin ? <AddTecnicoEF /> : <Auth />} />
          <Route path="technics_ef/:id/edit" element={isAdmin ? <EditTecnicoEF /> : <Auth />} />
          <Route path="institutions" element={isAdmin ? <InstituicoesList /> : <Auth />} />
          <Route path="institutions/:id" element={isAdmin ? <Instituicao /> : <Auth />} />
          <Route path="institutions/add" element={isAuthenticated ? <AddInstituicao /> : <Auth />} />
          <Route path="institutions/:id/edit" element={isAuthenticated ? <EditInstituicao /> : <Auth />} />
          <Route path="patients" element={isAuthenticated ? <UtentesList /> : <Auth />} />
          <Route path="patients/add" element={isAuthenticated ? <AddUtente /> : <Auth />} />
          <Route path="patients/:id/edit" element={isAuthenticated ? <EditUtente /> : <Auth />} />
          <Route path="patients/:id" element={isAuthenticated ? <Utente /> : <Auth />}>
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
      <Header />
      <Outlet />
    </>
  )
}

