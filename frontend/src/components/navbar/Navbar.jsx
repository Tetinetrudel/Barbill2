import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import UserModal from '../userModal/UserModal'

import { apiURL } from '../../utils/apiRoute'
import { BiSearch, BiSolidMessageRoundedDetail, BiSolidBell } from 'react-icons/bi'

import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const user = useSelector((state) => state.authReducer.user)
  const userId = useSelector((state) => state.authReducer.user._id)

  let currentPath 
  switch(location.pathname.substring(1)) {
    case "products":
      currentPath = "Produits"
      break
    case "clients":
      currentPath = "Clients"
      break
    case "inventory":
      currentPath = "Inventaire"
      break
    case "reports":
      currentPath = "Rapports"
      break    
    case "settings":
      currentPath = "Paramètres"
      break
    case `profile/${userId}`:
      currentPath = "Profile"
      break
    default:
      currentPath = "Tableau de bord"
      break
  }

  const [searchValue, setSearchValue] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className='navbar'>
      <div className="navbar-path">
        <h2>{currentPath}</h2>
      </div>
      <div className="navbar-tools">
        <div className="navbar-search">
          <input 
            type="search" 
            className="navbar-search-input" 
            placeholder="Chercher dans l'application"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)} 
          />
          <BiSearch />
        </div>
        <div className="navbar-icons">
          <span className='navbar-icon'><BiSolidMessageRoundedDetail /></span>
          <span className="navbar-icon"><BiSolidBell /></span>
        </div>
        <div className="navbar-user">
          <img src={`${apiURL}/assets/upload/${user.picture}`} alt="logo de l'entreprise" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>
      {isOpen && <UserModal user={user} userId={userId} isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}

export default Navbar