import { Outlet } from '@tanstack/react-router'
import { ClientList } from '../components/clients/ClientList'

export function ClientsPage() {
  return (
    <div>
      <ClientList />
      <Outlet />
    </div>
  )
}
