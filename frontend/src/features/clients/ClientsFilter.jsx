import React, { useState, useEffect } from 'react'

import { BiSearch } from 'react-icons/bi'

import '../../pages/clients/Clients.css'

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

const ClientsFilter = ({ clients, setFilteredClients, queryFilter, setQueryFilter }) => {

  const [activeFilter, setActiveFilter] = useState(0)
  
  useEffect(() => {
    if(activeFilter === 0) {
        setFilteredClients(clients)
        return
    }

    if(activeFilter === 1) {
      const filtered = clients.filter((item) => item.status === false)
      setFilteredClients(filtered)
    }

    if(activeFilter === 2) {
      const filtered = clients.filter((item) => item.status === true)
      setFilteredClients(filtered)
    }
  }, [activeFilter])

  useEffect(() => {
    const normalizedQuery = normalizeString(queryFilter)
    const filtered = clients.filter((item) =>
      normalizeString(item.fullname).includes(normalizedQuery)
    )
    setFilteredClients(filtered)
  }, [queryFilter])

  return (
    <div className='clients-filter'>
      <div className="clients-filter-items">
        <span className={`clients-filter-item ${activeFilter === 0 && 'active'}`} onClick={(e) => setActiveFilter(0)}>Tous les clients</span>
        <span className={`clients-filter-item ${activeFilter === 1 && 'active'}`} onClick={(e) => setActiveFilter(1)}>Payé</span>
        <span className={`clients-filter-item ${activeFilter === 2 && 'active'}`} onClick={(e) => setActiveFilter(2)}>Paiement du</span>
        <span className={`clients-filter-item ${activeFilter === 3 && 'active'}`} onClick={(e) => setActiveFilter(3)}>En retard</span>
      </div>
      <div className="clients-filter-search">
        <input 
            type="search" 
            className="clients-filter-search-input" 
            placeholder="Trouver un clients"
            value={queryFilter} 
            onChange={(e) => setQueryFilter(e.target.value)} 
        />
        <BiSearch />
      </div>
    </div>
  )
}

export default ClientsFilter