import React from 'react'

const PayUniqueInvoice = ({ isOpen, setIsOpen, totalPrice, items }) => {

    if(totalPrice === 0 || items === 0) {
        return setIsOpen(!isOpen)
    }

  return (
    <div className='modal-bacdrop'>
        <div className="modal-wrapper">
            1  
        </div>        
    </div>
  )
}

export default PayUniqueInvoice