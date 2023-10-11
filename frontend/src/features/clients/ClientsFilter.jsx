import React, { useState, useEffect } from 'react'

import { BiSearch } from 'react-icons/bi'

import '../../pages/clients/Clients.css'

const ClientsFilter = ({ clients, setFilteredClients }) => {

  const [activeFilter, setActiveFilter] = useState(0)
  const [queryFilter, setQueryFilter] = useState("")

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
      const filtered = clients.filter((item) => item.fullname.toLowerCase().includes(queryFilter.toLowerCase()))
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