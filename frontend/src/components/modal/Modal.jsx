/* import dépendencies */
import React from 'react'

/* import features */

/* import components */

/* import api */

/* import reducer */

/* import icons */
import { AiOutlineClose } from 'react-icons/ai'

/* import style */
import './Modal.css'

const Modal = ({ children, close, title }) => {
  return (
    <div className="modal-backdrop">
        <div className="modal-wrapper">
            <div className="modal-header">
                <h1 className="modal-title">{title}</h1>
                <div className="modal-icon" onClick={close}>
                    <AiOutlineClose className="modal-close" />
                </div>
            </div>
            {children}
        </div>  
    </div>
  )
}

export default Modal