import { useEffect, useState } from 'react'
import { useBookProvider } from '../providers/useBookProvider'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'
import { Input, Skeleton } from 'antd'
import { useSalesProvider } from '../providers/useSalesProvider'
import { unwrapApiResponse } from '../types/api'
export function BookList() {
  const { books, loading, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  useEffect(() => {
    loadBooks()
  }, [])

  const { loadAllSales } = useSalesProvider()
  const [salesCount, setSalesCount] = useState<Record<string, number>>({})

  const refreshSales = () => {
    loadAllSales()
      .then(res => {
        const sales = unwrapApiResponse(res.data) as any[]
        const counts: Record<string, number> = {}
        sales.forEach(s => {
          counts[s.bookId] = (counts[s.bookId] || 0) + 1
        })
        setSalesCount(counts)
      })
      .catch(() => setSalesCount({}))
  }

  // load sales once and compute counts per book
  useEffect(() => {
    refreshSales()
    // refresh every 5 seconds to catch new sales
    const interval = setInterval(refreshSales, 5000)
    return () => clearInterval(interval)
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
              salesCount={salesCount[book.id] ?? 0}
            />
          ))
        )}
      </div>
    </>
  )
}
