import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Breadcrumb } from '../books/components/Breadcrumb';

export const Route = createFileRoute('/books')({
  component: () => (
    <div>
      <Breadcrumb items={[{ title: 'Books' }]} />
      <Outlet />
    </div>
  ),
});