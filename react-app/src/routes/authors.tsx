import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Breadcrumb } from '../books/components/Breadcrumb'

export const Route = createFileRoute('/authors')({
  component: () => (
    <div>
      <Breadcrumb items={[{ title: 'Authors' }]} />
      <Outlet />
    </div>
  ),
})
