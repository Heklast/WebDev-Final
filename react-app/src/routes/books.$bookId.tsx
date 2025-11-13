import { createFileRoute } from '@tanstack/react-router'
import { Breadcrumb } from '../books/components/Breadcrumb'
import { BookDetails } from '../books/components/BookDetails'
import { useBookDetails } from '../books/providers/useBookDetails'

export const Route = createFileRoute('/books/$bookId')({
  component: BookDetailsPage,
})

function BookDetailsPage() {
  const { bookId } = Route.useParams()
  const { book, loading, error } = useBookDetails(bookId)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!book) return <div>Book not found</div>

  return (
    <div>
      <Breadcrumb
        items={[{ title: 'Books', path: '/books' }, { title: book.title }]}
      />
      <BookDetails id={bookId} />
    </div>
  )
}
