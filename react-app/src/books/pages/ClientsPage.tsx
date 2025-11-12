import React from 'react'
import { Link } from '@tanstack/react-router'
import { useClientProvider } from '../hooks/useClientProvider'
import type { ClientModel } from '../../models/client'

export const ClientsPage: React.FC = () => {
  const { clients } = useClientProvider()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Clients</h1>
      <ul className="space-y-2">
        {clients.map((client: ClientModel) => (
          <li key={client.id}>
            <Link
              // @ts-expect-error route typing not generated yet
              to="/clients/$clientId"
              params={{ clientId: client.id }}
              className="text-blue-600 hover:underline"
            >
              {client.firstName} {client.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
