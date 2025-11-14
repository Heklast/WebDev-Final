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
      <Input.Search
        placeholder="Search books"
        onChange={e => setQuery(e.target.value)}
        style={{ margin: '1rem 0', width: '50%' }}
      />
      <CreateBookModal onCreate={createBook} />
      <div style={{ padding: '0 .5rem' }}>
        {loading ? (
          <Skeleton active />
        ) : (
          filteredBooks.map(book => (
            <BookListItem
              key={book.id}
              book={book}
              onDelete={deleteBook}
            />
          ))
        )}
      </div>
    </>
  )
}
