import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchDeleteClient } from '../../api/clients/Clients'

import ClientUpdate from './ClientUpdate'
import ClientDetails from './ClientDetails'

import { BiTrash, BiEdit } from 'react-icons/bi'

import '../../pages/clients/Clients.css'



const ClientsTable = ({ clients, filteredClients, error, isUpdated, setIsUpdated }) => {
    const accessToken = useSelector((state) => state.authReducer.token)

    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    const [clientId, setClientId] = useState("")

    const handleOpenUpdate = (client) => {
        setClientId(client._id)
        setIsOpenUpdate(!isOpenUpdate)
    }

    const handleOpenDetails = (client) => {
        setClientId(client._id)
        setIsOpenDetails(!isOpenDetails)
    }
    
    const handleDelete = async (clientId) => {
        try {
            const result = await fetchDeleteClient(accessToken, clientId)
            if(result.success) {
                setIsUpdated(!isUpdated)
            } else {
                console.log(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

  return (
    <>
    {isOpenUpdate && <ClientUpdate clients={clients} clientId={clientId} setIsOpenUpdate={setIsOpenUpdate} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />}
    {isOpenDetails && <ClientDetails clients={clients} clientId={clientId} setIsOpenDetails={setIsOpenDetails} isUpdated={isUpdated} setIsUpdated={setIsUpdated} />}
    <ul className="clients-table">
        <li className="clients-table-header">
            <div className="col-1">Nom</div>
            <div className="col-2">Courriel</div>
            <div className="col-3">Status</div>
            <div className="col-4">Montant dû</div>
            <div className="col-4">Depuis</div>
            <div className="col-4"></div>
        </li>
        {error && (
            <li className='clients-table-row'>
                <p>{error}</p>
            </li>
        )}
        {filteredClients.length > 0 && filteredClients.map((client) => (
        <li className="clients-table-row" key={client._id}>
            <div className="col-1">
                <p className='text-link' onClick={() => handleOpenDetails(client)}>{client.fullname}</p>
            </div>
            <div className="col-2">{client.email}</div>
            <div className="col-3">
                <span className={`pills ${client.status === true ? 'pills-error' : 'pills-success'}`}>
                    {client.status ? "montant du" : "Payé"}
                </span>
            </div>
            <div className="col-4">{client.products.reduce((clientAccumulator, product) => clientAccumulator + product.product.price, 0).toFixed(2)} $</div>
            <div className="col-4">
                {client.products.length > 0 ?
                `${Math.ceil((Date.parse(Date())-Date.parse(client.products[0].addedAt)) / (1000 * 3600 * 24))} jours` : '0 jour'}
            </div>
            <div className="col-4 flex-icons">
                <BiEdit className='edit-icon' onClick={() => handleOpenUpdate(client)}/>
                <BiTrash className='trash-icon' onClick={() => handleDelete(client._id)}/>
            </div>
        </li>
        ))}
    </ul>
    </>
  )
}

export default ClientsTable