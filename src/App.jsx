import ReactDOM from "react-dom/client";
import { Router, RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";
import Home from "./pages/Home/Home";
import Sobre from "./pages/Sobre/Sobre";
import Contatos from "./pages/Contatos/Contatos";
import Auth from "./pages/Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/sobre",
    element: <Sobre />
  },
  {
    path: "/contatos",
    element: <Contatos />
  },
  {
    path: "/auth",
    element: <Auth />
  }
])
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </>
  )
}
export default App
