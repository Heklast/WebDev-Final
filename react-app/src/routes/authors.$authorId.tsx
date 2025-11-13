import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../books/components/Breadcrumb'
import { AuthorDetails } from '../books/components/authors/AuthorDetails'
import { useAuthorDetails } from '../books/providers/useAuthorDetails'

export const Route = createFileRoute('/authors/$authorId')({
  component: AuthorDetailsPage,
})

function AuthorDetailsPage() {
  const { authorId } = Route.useParams()
  const { author, loading, error } = useAuthorDetails(authorId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!author) return <div>Author not found</div>

  return (
    <div>
      <Breadcrumb
        items={[
          { title: 'Authors', path: '/authors' },
          { title: `${author.firstName} ${author.lastName}` },
        ]}
      />
      <AuthorDetails id={authorId} />
    </div>
  )
}
