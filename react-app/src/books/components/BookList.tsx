import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { useSalesProvider } from '../providers/useSalesProvider' 
import { Input, Skeleton } from 'antd'
export function BookList() {
  const { books, loading, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  const { sales, loadSales } = useSalesProvider() // Add sales provider
  const [salesCounts, setSalesCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    loadBooks(),
    loadSales() //  Load sales data
  }, [])

    useEffect(() => {
    if (!sales.length) return

    const counts: Record<string, number> = {}
    sales.forEach(sale => {
      counts[sale.bookId] = (counts[sale.bookId] || 0) + 1
    })
    setSalesCounts(counts)
  }, [sales])

  const [query, setQuery] = useState<string>('')
  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '1rem 0',
          width: '100%',
        }}
      >
        <Input.Search
          placeholder="Search books"
          onChange={e => setQuery(e.target.value)}
          style={{
            width: '60%',
            maxWidth: '500px',
          }}
        />

        <CreateBookModal onCreate={createBook} />
      </div>

      <div style={{ padding: '0 .5rem' }}>
        {loading ? (
          <Skeleton active />
        ) : (
          filteredBooks.map(book => (
            <BookListItem
              key={book.id}
              book={book}
              onDelete={deleteBook}
              onUpdate={updateBook}
              salesCount={salesCounts[book.id] || 0}
            />
          ))
        )}
      </div>
    </>
  )
}
