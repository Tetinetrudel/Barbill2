import React, { useState } from 'react'

import AddClient from './AddClient'

import { FiUsers } from 'react-icons/fi'

import '../../pages/clients/Clients.css'

const ClientsHeader = ({ clients, props }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleAddClient = () => {
    setIsOpen(!isOpen)
  }

  let totalClient
  if(clients.length > 0) {
    totalClient = clients.length
  } else {
    totalClient = 0
  }

  return (
    <div className='clients-header'>
      {isOpen && <AddClient props={props} isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="clients-header-title">
        <h1>Liste des clients</h1>
        <div className="clients-header-button">
          <button className="btn btn-blue" onClick={handleAddClient}>+ ajouter un client</button>
        </div>
      </div>
      <div className="clients-header-data">
        <div className="clients-box">
          <h2>Paiement en attente</h2>
          <h1>$ {props.totalSum.toFixed(2)}</h1>
          <div className="customers">
            <FiUsers />
            <p>{props.clientWithBill} {props.clientWithBill > 1 ? "clients" : "client"}</p>
          </div>
        </div>
        <div className="clients-box">
          <h2>Clients total</h2>
          <h1># {totalClient}</h1>
          <div className="customers">
            <FiUsers />
            <p>{props.newClients} {props.newClients > 1 ? 'nouveaux' : 'nouveau'} dans les derniers jours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientsHeader