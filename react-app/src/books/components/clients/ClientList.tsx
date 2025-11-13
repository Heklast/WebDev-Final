import {  useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { useClientProvider } from '@/books/providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'
import { useSalesProvider } from '../../providers/useSalesProvider'
import { unwrapApiResponse } from '../../types/api'

export function ClientList() {
  const {
    clients,
    loading,
    loadClients,
    createClient,
    updateClient,
    deleteClient,
  } = useClientProvider()
  const { loadAllSales } = useSalesProvider()
  const [salesCount, setSalesCount] = useState<Record<string, number>>({})

  const refreshSales = () => {
    loadAllSales()
      .then(res => {
        const sales = unwrapApiResponse(res.data)
        const counts: Record<string, number> = {}
        sales.forEach((s: any) => {
          counts[s.clientId] = (counts[s.clientId] || 0) + 1
        })
        setSalesCount(counts)
      })
      .catch(() => setSalesCount({}))
  }

  useEffect(()=> {
    loadClients()
    refreshSales()
    // refresh every 5 seconds to catch new sales
    const interval = setInterval(refreshSales, 5000)
    return () => clearInterval(interval)
  }, [loadClients])

  return (
    <>
      <CreateClientModal onCreate={createClient} />
      <div style={{ padding: '0 .5rem' }}>
        {loading ? (
          <Skeleton active />
        ) : (
          clients.map(client => (
            <ClientListItem
              key={client.id}
              client={client}
              onUpdate={updateClient}
              onDelete={deleteClient}
              salesCount={salesCount[client.id] ?? 0}
            />
          ))
        )}
      </div>
    </>
  )
}
