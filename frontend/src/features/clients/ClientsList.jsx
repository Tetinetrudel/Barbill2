import React, { useState } from 'react'

import ClientsFilter from './ClientsFilter'
import ClientsTable from './ClientsTable'

import '../../pages/clients/Clients.css'
  const ClientsList = ({ clients, filteredClients, setFilteredClients, error, isUpdated, setIsUpdated }) => {
  
  const [queryFilter, setQueryFilter] = useState("")

  return (
    <div className='clients-list'>
      <ClientsFilter clients={clients} setFilteredClients={setFilteredClients} queryFilter={queryFilter} setQueryFilter={setQueryFilter} />
      <ClientsTable 
        clients={clients} 
        filteredClients={filteredClients} 
        error={error} 
        isUpdated={isUpdated} 
        setIsUpdated={setIsUpdated} 
        setQueryFilter={setQueryFilter}
      />
    </div>
  )
}

export default ClientsList