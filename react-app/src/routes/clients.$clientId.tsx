// src/routes/clients.$clientId.tsx
import { createFileRoute } from '@tanstack/react-router'
import { ClientDetails } from '../books/components/clients/ClientDetails'

// TS will complain because this route is not in FileRoutesByPath yet
// @ts-expect-error
export const clientDetailsRoute = createFileRoute('/clients/$clientId')({
  component: ClientDetails,
})
