import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchAddClient } from '../../api/clients/Clients'

import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidUserDetail } from 'react-icons/bi'
import { HiMail } from 'react-icons/hi'


import '../../pages/clients/Clients.css'


const AddClient = ({ props, setIsOpen }) => {
  const accessToken = useSelector((state) => state.authReducer.token)

  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  
  const handleSubmit = async (e) => {
      e.preventDefault()
      const payload ={fullname, email}
      try {
        const result = await fetchAddClient(accessToken, payload)
        if(result.success) {
          props.setIsUpdated(!props.isUpdated)
          setIsOpen(false)
          setError("")
        } else {
          setError(result.message)
        }
      } catch (error) {
        throw new Error(error)
      }
  }

  return (
    <div className='modal-backdrop'>
      <div className="modal-wrapper">
        <div className="client-update-header">
          <h2>Ajouter un client</h2>
          <AiOutlineClose onClick={() => setIsOpen(false)} />
        </div>
        <div className="client-update-content">
          <form className="form">
            <div className="form-group">
              <input 
                type="text" 
                className="form-input" 
                value={fullname} 
                placeholder="Nom complet"
                onChange={(e) => setFullname(e.target.value)} 
              />
              <BiSolidUserDetail className='form-svg' />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                className="form-input" 
                value={email} 
                placeholder="Courriel"
                onChange={(e) => setEmail(e.target.value)} 
              />
              <HiMail className='form-svg' />
            </div>
            <div className="form-group">
              {error && <p className="error-message">*{error}</p>}
              <button className="btn btn-blue" onClick={handleSubmit}>Ajouter</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default AddClient