import { createFileRoute } from '@tanstack/react-router'
import { AuthorsPage } from '../../books/pages/AuthorsPage'

export const Route = createFileRoute('/authors/')({
  component: AuthorsPage,
})
