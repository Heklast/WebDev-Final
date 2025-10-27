import { createFileRoute } from '@tanstack/react-router'
import { AuthorDetails } from '../books/components/authors/AuthorDetails'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
})

function AuthorDetailsPage() {
  const { authorId } = Route.useParams()

  return <AuthorDetails id={authorId} />
}
