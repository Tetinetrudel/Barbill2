import React from 'react'

import { fetchCardCountMinus, fetchCardCountPlus } from '../../api/clients/Clients'

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import '../../pages/clients/Clients.css'

const ClientCards = ({ client, isUpdated, setIsUpdated, isUpdatedDetails, setIsUpdatedDetails }) => {
  const clientId = client._id

  const handleCardCountMinus = async (cardId) => {
    try {
      const result = await fetchCardCountMinus(clientId, cardId)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsUpdatedDetails(!isUpdatedDetails)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }    
  }

  const handleCardCountPlus = async (cardId) => {
    try {
      const result = await fetchCardCountPlus(clientId, cardId)
      if(result.success) {
        setIsUpdated(!isUpdated)
        setIsUpdatedDetails(!isUpdatedDetails)
      } else {
        console.error(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }    
  }

  return (
    <div className='client-bill'>
    <div className="client-bill-title">
        <h2>Carte</h2>
    </div>
    <div className="client-bill-body">
    {client.cards.map(item => (
    <div className="client-bill-content" key={item.product._id}>
        <p className='client-bill-product-name'>
            {item.product.name} 
        </p>
        <div className="count-box">
          <span className='plus-box pointer' onClick={() => handleCardCountPlus(item._id)}>
                <AiOutlinePlus className='minus-plus'/>
            </span>
            <span className='number-box'>
                <p className="invoice-item">{item.count}</p>
            </span>
            <span className='plus-box pointer' onClick={() => handleCardCountMinus(item._id)}>
                <AiOutlineMinus className='minus-plus'/>
            </span>
        </div>
    </div>
    ))}
    </div>
</div>
  )
}

export default ClientCards