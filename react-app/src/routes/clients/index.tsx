import { createFileRoute } from '@tanstack/react-router'
import { ClientsPage } from '../../books/pages/ClientsPage'

export const Route = createFileRoute('/clients/')({
  component: ClientsPage,
})
