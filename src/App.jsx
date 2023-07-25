import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header/Header';
import Home from './components/Home/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Home />
    </div>

  )
}

export default App
