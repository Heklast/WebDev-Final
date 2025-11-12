import { useState } from 'react'
import type { ClientModel } from '@/models/client'

export function useClientProvider() {
  // temporary mock data
  const [clients] = useState<ClientModel[]>([
    { id: '1', firstName: 'Alice', lastName: 'Smith', email: 'alice@mail.com' },
    { id: '2', firstName: 'Bob', lastName: 'Brown', email: 'bob@mail.com' },
  ])

  return { clients }
}
