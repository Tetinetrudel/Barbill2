import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import ClientsHeader from '../../features/clients/ClientsHeader'
import ClientsList from '../../features/clients/ClientsList'

import { fetchAllClients } from '../../api/clients/Clients'
import { fetchGetSettings } from '../../api/settings/Settings'

import './Clients.css'

const Clients = () => {
  const accessToken = useSelector((state) => state.authReducer.token)

  const [clients, setClients] = useState([])
  const [ filteredClients, setFilteredClients] = useState([])
  const [error, setError] = useState("")
  const [isUpdated, setIsUpdated] = useState(false)
  
  const handleGetClients = async () => {
    try {
      const result = await fetchAllClients(accessToken)
      if(result.success) {
        setClients(result.clients)
        setFilteredClients(result.clients)
        setError("")
      } else {
        setError(result.message)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    handleGetClients()
  }, [isUpdated])

  //quelques variable utiles dans le rendu de l'application
  const totalSum = clients.reduce((accumulator, client) => {
    const clientTotal = client.products.reduce((clientAccumulator, product) =>
        clientAccumulator + product.product.price, 0)
    return accumulator + clientTotal;
  }, 0)

  const clientWithBill = clients.filter((client) => client.status === true).length

  const fiveDaysAgo = new Date()
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)

  const newClients = clients.filter((client) => {
    const clientCreatedAt = new Date(client.createdAt)
    return clientCreatedAt >= fiveDaysAgo
  }).length


  const props = {totalSum, clientWithBill, error, setError, isUpdated, setIsUpdated, newClients}

  return (
    <main className="clients">
      <ClientsHeader clients={clients} props={props} />
      <ClientsList 
        clients={clients}  
        filteredClients={filteredClients}
        setFilteredClients={setFilteredClients}
        error={error} 
        isUpdated={isUpdated} 
        setIsUpdated={setIsUpdated} 
      />
    </main>
  )
}

export default Clients