import { Routes, Route } from 'react-router-dom'

import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import Layouts from './layouts/Layouts'
import Home from './pages/home/Home'
import Products from './pages/products/Products'
import Clients from './pages/clients/Clients'
import Settings from './pages/settings/Settings'
import Profile from './pages/profile/Profile'

const App = () => {

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<ProtectedRoute><Layouts /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/inventory' element={<h1>Inventaire</h1>} />
        <Route path='/reports' element={<h1>Rapports</h1>} />
        <Route path='/profile/:id' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App