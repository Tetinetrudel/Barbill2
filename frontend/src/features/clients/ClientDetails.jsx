import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import ClientBill from './ClientBill'
import ClientCards from './ClientCards'
import AddProductToClient from './AddProductToClient'

import { fetchClientDetails } from '../../api/clients/Clients'

import { AiOutlineClose } from 'react-icons/ai'

import '../../pages/clients/Clients.css'

const ClientDetails = ({ clientId, setIsOpenDetails, isUpdated, setIsUpdated }) => {
    const accessToken = useSelector((state) => state.authReducer.token)

    const [client, setClient] = useState(null)
    const [isUpdatedDetails, setIsUpdatedDetails] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    const handleGetClientDetails = async () => {
        try {
            const result = await fetchClientDetails(accessToken, clientId)
            if(result.success) {
                setClient(result.client)
                setIsLoading(false)
            } else {
                setError(result.message)
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    useEffect(() => {
        handleGetClientDetails()
    }, [accessToken, clientId, isUpdatedDetails])

    if(isLoading){ return }

  return (
    <div className='client-update-modal-backdrop'>
        <div className="client-update-modal-wrapper">
            <div className="client-update-header">
                <h2>{client.fullname}</h2>
                <div className="client-details-action">
                    <button className="btn btn-blue" onClick={() => setIsOpen(!isOpen)}>Ajouter</button>
                    <AiOutlineClose onClick={() => setIsOpenDetails(false)} />
                </div>
            </div>
            <div className="client-details-content">
                <ClientBill 
                    client={client} 
                    isUpdated={isUpdated}
                    setIsUpdated={setIsUpdated}
                    isUpdatedDetails={isUpdatedDetails}
                    setIsUpdatedDetails={setIsUpdatedDetails}
                />
                <ClientCards 
                    client={client} 
                    isUpdated={isUpdated}
                    setIsUpdated={setIsUpdated}
                    isUpdatedDetails={isUpdatedDetails}
                    setIsUpdatedDetails={setIsUpdatedDetails}
                />
            </div>
        </div>
        {isOpen && 
            <AddProductToClient 
                clientId={clientId} 
                isOpen={isOpen} 
                setIsOpen={setIsOpen}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                isUpdatedDetails={isUpdatedDetails}
                setIsUpdatedDetails={setIsUpdatedDetails}
            />
        }
  </div>
  )
}

export default ClientDetails