import React from 'react'
import { useParams, Link } from '@tanstack/react-router'
import { useClientProvider } from '@/books/hooks/useClientProvider'
import type { ClientModel } from '@/models/client'

export const ClientDetails: React.FC = () => {
  const { clientId } = useParams({ from: '/clients/$clientId' })
  const { clients } = useClientProvider()

  const client = clients.find((c: ClientModel) => c.id === clientId)

  if (!client) return <p className="p-4 text-gray-500">Client not found.</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">
        {client.firstName} {client.lastName}
      </h2>
      {client.email && <p className="text-gray-600 mb-2">Email: {client.email}</p>}
      <Link to="/clients" className="text-blue-600 hover:underline">
        ← Back to clients
      </Link>
    </div>
  )
}
