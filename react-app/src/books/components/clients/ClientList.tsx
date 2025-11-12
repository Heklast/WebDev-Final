import React from 'react'
import type { ClientModel, UpdateClientModel } from '@/books/ClientModel'
import { ClientListItem } from './ClientListItem'

interface ClientListProps {
  clients: ClientModel[]
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  onDelete,
  onUpdate,
}) => {
  if (clients.length === 0) {
    return <p className="text-gray-500 p-4">No clients found.</p>
  }

  return (
    <ul className="space-y-2">
      {clients.map(client => (
        <li key={client.id}>
          <ClientListItem
            client={client}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        </li>
      ))}
    </ul>
  )
}
