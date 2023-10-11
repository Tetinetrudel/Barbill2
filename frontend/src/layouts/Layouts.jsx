import { Outlet } from 'react-router-dom'

import Sidebar from '../components/sidebar/Sidebar'
import Navbar from '../components/navbar/Navbar'

import './Layout.css'
const Layouts = () => {
  return (
    <div className='site-display'>
        <Sidebar />
        <div className='content-display'>
            <Navbar />
            <Outlet />
        </div>
    </div>
  )
}

export default Layouts