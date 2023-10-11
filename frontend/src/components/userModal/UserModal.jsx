import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { setLogout } from '../../reducers/auth/Auth'
import { clearProductToInvoice } from '../../reducers/invoices/Invoices'

import { BiPlus } from 'react-icons/bi'

import './UserModal.css'

const UserModal = ({ user, userId, isOpen, setIsOpen }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(user)
  const handleLogout = () => {
    dispatch(setLogout())
    dispatch(clearProductToInvoice())
    setIsOpen(!isOpen)
    navigate('/login')
  }

  const handleSettings = () => {
    setIsOpen(!isOpen)
    navigate('/settings')
  }

  const handleProfile = () => {
    setIsOpen(!isOpen)
    navigate(`/profile/${userId}`)
  }
  
  return (
    <div className='user-modal'>
      <div className="user-modal-header">
        <h2>{user.company}</h2>
        <button className="user-modal-btn" onClick={handleProfile} >Voir le profile</button>
      </div>
      <div className="user-modal-link">
        <p onClick={handleSettings}>Paramètres</p>
        <p onClick={handleLogout}>Se déconnecter</p>
      </div>
      <div className="user-modal-employee">
        <h3>Etienne Trudel</h3>
        <p><BiPlus /> <span>Changer d'employé</span></p>
      </div>
    </div>
  )
}

export default UserModal