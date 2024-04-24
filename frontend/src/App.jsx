import { useState } from 'react'
import './App.css'
import SignUpForm from './componenets/signUp'
import SignInForm from './componenets/signIn'
import Landing from './componenets/landingpage'

import { BrowserRouter,Route,Routes,Link } from "react-router-dom";
import Register from './componenets/register'
import Home from './componenets/home'
import DashBoard from './componenets/dashboard'
import BlogPage from './componenets/BlogPage'
import Navbar from './componenets/navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <DashBoard />
  
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    <Routes>
        <Route path="/login" element={<div className='bg-slate-900'>  <Landing/>
      </div>} /> 
     
      <Route path='/register' element={<div className='bg-slate-900'> 
      <Register/>
      </div>}/>
      <Route path='/dash' element={<DashBoard />} />
      <Route path='/blog' element={<BlogPage/>} />
      <Route path='/nav' element={<Navbar/>} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
