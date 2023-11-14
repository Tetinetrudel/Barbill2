import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { fetchDeleteClient } from '../../api/clients/Clients'

import Modal from '../../components/modal/Modal'
import ClientUpdate from './ClientUpdate'
import ClientDetails from './ClientDetails'

import { BiTrash, BiEdit } from 'react-icons/bi'

import '../../pages/clients/Clients.css'



const ClientsTable = ({ clients, filteredClients, error, isUpdated, setIsUpdated, setQueryFilter }) => {
    const accessToken = useSelector((state) => state.authReducer.token)

    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    const [clientId, setClientId] = useState("")
    const [clientName, setClientName] = useState("")

    const handleOpenUpdate = (client) => {
        setClientId(client._id)
        setIsOpenUpdate(!isOpenUpdate)
    }

    const handleOpenDetails = (client) => {
        setQueryFilter("")
        setClientId(client._id)
        setClientName(client.fullname)
        setIsOpenDetails(!isOpenDetails)
    }
    
    const handleCloseDetails = () => {
        setIsOpenDetails(!isOpenDetails)
    }

    const handleCloseUpdate = () => {
        setIsOpenUpdate(!isOpenUpdate)
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
    
    const getRemainingCount = (client) => {
        const firstAvailableCard = client.cards.find((card) => card.count > 0)
        if (firstAvailableCard) {
          const productName = firstAvailableCard.product.name.slice(6,100)
          return { count: firstAvailableCard.count, productName }
        } else {
          return { count: 0, productName: '' }
        }
    }

  return (
    <>
    {isOpenUpdate && 
    <Modal close={handleCloseUpdate} title={`Modifer ${clientName}`}>
        <ClientUpdate 
            clients={clients} 
            clientId={clientId} 
            setIsOpenUpdate={setIsOpenUpdate} 
            isUpdated={isUpdated} 
            setIsUpdated={setIsUpdated} />
    </Modal>}
    {isOpenDetails && 
    <Modal close={handleCloseDetails} title={clientName}>
        <ClientDetails 
            clients={clients} 
            clientId={clientId} 
            setIsOpenDetails={setIsOpenDetails} 
            isUpdated={isUpdated} 
            setIsUpdated={setIsUpdated} 
        />
    </Modal>}
    <ul className="clients-table">
        <li className="clients-table-header">
            <div className="col-1">Nom</div>
            <div className="col-2">Courriel</div>
            <div className="col-3">Status</div>
            <div className="col-3">Carte restante</div>
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
            <div className="col-3">
            {getRemainingCount(client).count} {getRemainingCount(client).productName}
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