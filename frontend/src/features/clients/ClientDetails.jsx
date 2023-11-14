import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Modal from '../../components/modal/Modal'
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
    const [isOpenAddProduct, setIsOpenAddProduct] = useState(false)

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

    const handleClose = () => {
        setIsOpenAddProduct(!isOpenAddProduct)
    }

  return (
    <>
    <button 
        style={{ width: "150px", marginTop: "20px", marginLeft: "20px"}}
        className="btn btn-blue" onClick={() => setIsOpenAddProduct(!isOpenAddProduct)}
    >Ajouter à la facture</button>
    <div className="client-details-content">
        {!isLoading && 
        <>
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
        </>
        }
    </div>
    {isOpenAddProduct && 
        <Modal close={handleClose} title="Ajouter un produit">
            <AddProductToClient 
                clientId={clientId} 
                setIsOpenAddProduct={setIsOpenAddProduct}
                isUpdated={isUpdated}
                setIsUpdated={setIsUpdated}
                isUpdatedDetails={isUpdatedDetails}
                setIsUpdatedDetails={setIsUpdatedDetails}
            />
        </Modal>
    }
    </>
  )
}

export default ClientDetails