import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { AiOutlineClose } from 'react-icons/ai'
import { BiSolidUserDetail } from 'react-icons/bi'
import { HiMail } from 'react-icons/hi'

import { fetchUpdateClient } from '../../api/clients/Clients'

import '../../pages/clients/Clients.css'


const ClientUpdate = ({ clients, clientId, setIsOpenUpdate, isUpdated, setIsUpdated }) => {
  const accessToken = useSelector((state) => state.authReducer.token)
  const client = clients.filter(c => c._id === clientId)
  const [updatedName, setUpdatedName] = useState(client[0].fullname)
  const [updatedEmail, setUpdatedEmail] = useState(client[0].email)
  const [error, setError] = useState("")

  if(!client) {
    return <p>Aucun client trouvé</p>
  }
  
  const handleSubmit = async (e, clientId) => {
    e.preventDefault()
    try {
      const payload ={ updatedName, updatedEmail}
      const result = await fetchUpdateClient(accessToken, payload, clientId)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsOpenUpdate(false)
      } else {
        setError(result.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='client-update-modal-backdrop'>
      <div className="client-update-modal-wrapper">
        <div className="client-update-header">
          <h2>Modifier les informations</h2>
          <AiOutlineClose onClick={() => setIsOpen(false)} />
        </div>
        <div className="client-update-content">
          <form className="form">
            <div className="form-group">
              <input type="text" className="form-input" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
              <BiSolidUserDetail className='form-svg' />
            </div>
            <div className="form-group">
              <input type="text" className="form-input" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
              <HiMail className='form-svg' />
            </div>
            <div className="form-group">
              {error && <p className="error-message">*{error}</p>}
              <button className="btn btn-blue" onClick={(e) => handleSubmit(e, client[0]._id)}>Modifier</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  )
}

export default ClientUpdate