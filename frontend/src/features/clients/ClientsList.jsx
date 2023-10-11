import React from 'react'

import ClientsFilter from './ClientsFilter'
import ClientsTable from './ClientsTable'

import '../../pages/clients/Clients.css'
const ClientsList = ({ clients, filteredClients, setFilteredClients, error, isUpdated, setIsUpdated }) => {

  return (
    <div className='clients-list'>
      <ClientsFilter clients={clients} setFilteredClients={setFilteredClients} />
      <ClientsTable 
        clients={clients} 
        filteredClients={filteredClients} 
        error={error} 
        isUpdated={isUpdated} 
        setIsUpdated={setIsUpdated} 
      />
    </div>
  )
}

export default ClientsList