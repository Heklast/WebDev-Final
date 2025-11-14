import { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import { useClientProvider } from '@/books/providers/useClientProvider'
import { useSalesProvider } from '@/books/providers/useSalesProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const {
    clients,
    loading,
    loadClients,
    createClient,
    updateClient,
    deleteClient,
  } = useClientProvider()

  const { sales, loadSales } = useSalesProvider() // ✅ Add sales provider
  const [purchaseCounts, setPurchaseCounts] = useState<Record<string, number>>({}) // ✅ Track counts

  useEffect(() => {
    loadClients()
    loadSales() // ✅ Load sales data
  }, [])

  //  Calculate purchase count for each client
  useEffect(() => {
    if (!sales.length) return

    const counts: Record<string, number> = {}
    sales.forEach(sale => {
      counts[sale.clientId] = (counts[sale.clientId] || 0) + 1
    })
    setPurchaseCounts(counts)
  }, [sales])

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
              purchaseCount={purchaseCounts[client.id] || 0} //  Pass count
            />
          ))
        )}
      </div>
    </>
  )
}