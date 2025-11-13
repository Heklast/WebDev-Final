import { useState, useEffect } from 'react'
import axios from 'axios'
import type { ClientModel } from '../ClientModel'

export const useClientDetails = (clientId: string) => {
  const [client, setClient] = useState<ClientModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!clientId) return

    setLoading(true)
    setError(null)
    axios
      .get(`http://localhost:3000/clients/${clientId}`)
      .then(res => {
        const body = res.data
        const parsed: ClientModel = 'data' in body ? body.data : body
        setClient(parsed)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to fetch client')
      })
      .finally(() => setLoading(false))
  }, [clientId])

  return { client, loading, error }
}
