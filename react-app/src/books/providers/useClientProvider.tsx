import { useState, useCallback } from 'react'
import axios from 'axios'
import type { ClientModel, CreateClientModel, UpdateClientModel } from '../ClientModel'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])
  const [loading, setLoading] = useState(false)

  const loadClients = useCallback(() => {
    setLoading(true)
    axios
      .get('http://localhost:3000/clients')
      .then(res => {
        const body = (res.data as any)?.data ?? res.data
        setClients(body as ClientModel[])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const createClient = (input: CreateClientModel) => {
    axios
      .post('http://localhost:3000/clients', input)
      .then(() => loadClients())
      .catch(err => console.error(err))
  }

  const updateClient = (id: string, input: UpdateClientModel) => {
    axios
      .patch(`http://localhost:3000/clients/${id}`, input)
      .then(() => loadClients())
      .catch(err => console.error(err))
  }

  const deleteClient = (id: string) => {
    axios
      .delete(`http://localhost:3000/clients/${id}`)
      .then(() => loadClients())
      .catch(err => console.error(err))
  }

  return { clients, loading, loadClients, createClient, updateClient, deleteClient }
}
