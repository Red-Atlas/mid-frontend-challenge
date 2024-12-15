import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { Edit } from './pages/Edit'
import { Create } from './pages/Create'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import './App.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/detail/:id' element={<Detail/>}/>
           <Route path='/edit/:id' element={<Edit/>}/>
           <Route path='/create/' element={<Create/>}/>
           <Route path='*' element={<div>404</div>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
