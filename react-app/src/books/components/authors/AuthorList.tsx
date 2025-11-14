import { useEffect } from 'react'
import { useBookAuthorsProviders } from '../../providers/useBookAuthorsProviders'
import { useBookProvider } from '../../providers/useBookProvider'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'
import { Skeleton } from 'antd'

export function AuthorList() {
  const { authors, loading, loadAuthors, createAuthor, deleteAuthor } =
    useBookAuthorsProviders()

  const { books, loadBooks } = useBookProvider()

  useEffect(() => {
    loadAuthors()
    loadBooks()
  }, [])

  return (
    <>
      <CreateAuthorModal onCreate={createAuthor} />
      <div style={{ padding: '5rem' }}>
        {loading ? (
          <Skeleton active />
        ) : (
          authors.map(author => (
            <AuthorListItem
              key={author.id}
              author={author}
              books={books}
              onDelete={deleteAuthor}
            />
          ))
        )}
      </div>
    </>
  )
}
