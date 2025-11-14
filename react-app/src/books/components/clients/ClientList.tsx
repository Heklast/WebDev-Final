import { useEffect } from 'react'
import { Skeleton } from 'antd'
import { useClientProvider } from '@/books/providers/useClientProvider'
import { ClientListItem } from './ClientListItem'
import { CreateClientModal } from './CreateClientModal'

export function ClientList() {
  const { clients, loading, loadClients, createClient, deleteClient } =
    useClientProvider()

  useEffect(() => {
    loadClients()
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
              onDelete={deleteClient}
            />
          ))
        )}
      </div>
    </>
  )
}
