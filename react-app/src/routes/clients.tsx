// src/routes/clients.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ClientsPage } from '../books/pages/ClientsPage'

// TS will complain because this route is not in FileRoutesByPath yet
// @ts-expect-error
export const clientsRoute = createFileRoute('/clients')({
  component: ClientsPage,
})
