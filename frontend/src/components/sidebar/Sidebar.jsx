import React from 'react'
import { Link } from 'react-router-dom'

import { sidebarMenu } from '../../constants/sidebarMenu'
import { BiExclude } from 'react-icons/bi'

import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-logo">
        <BiExclude />
        <h1>Barbill</h1>
      </div>
      <nav className="sidebar-navigation">
        <ul className="sidebar-items">
          {sidebarMenu.map((item) => (
            <li key={item.title} className="sidebar-item">
              {item.icon}
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar