import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../books/components/Breadcrumb'
import { ClientDetails } from '../books/components/clients/ClientDetails'
import { useClientDetails } from '../books/providers/useClientDetails'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsPage,
})

function ClientDetailsPage() {
  const { clientId } = Route.useParams()
  const { client, loading, error } = useClientDetails(clientId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!client) return <div>Client not found</div>

  return (
    <div>
      <Breadcrumb
        items={[
          { title: 'Clients', path: '/clients' },
          { title: `${client.firstName} ${client.lastName}` },
        ]}
      />
      <ClientDetails id={clientId} />
    </div>
  )
}
