import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Breadcrumb } from '../books/components/Breadcrumb'

export const Route = createFileRoute('/clients')({
  component: () => (
    <div>
      <Breadcrumb items={[{ title: 'Clients' }]} />
      <Outlet />
    </div>
  ),
})
