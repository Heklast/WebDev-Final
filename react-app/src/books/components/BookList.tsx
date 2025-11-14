import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { Input, Skeleton } from 'antd'

export function BookList() {
  const { books, loading, loadBooks, deleteBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  const [query, setQuery] = useState<string>('')
  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          margin: '1rem 0',
        }}
      >
        <Input.Search
          placeholder="Search books"
          onChange={e => setQuery(e.target.value)}
          style={{ width: '300px' }}
        />

        <CreateBookModal onCreate={createBook} />
      </div>

      <div style={{ padding: '0 .5rem' }}>
        {loading ? (
          <Skeleton active />
        ) : (
          filteredBooks.map(book => (
            <BookListItem key={book.id} book={book} onDelete={deleteBook} />
          ))
        )}
      </div>
    </>
  )
}
