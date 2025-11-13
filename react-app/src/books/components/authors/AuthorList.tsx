import { useEffect, useState } from 'react'
import { useBookAuthorsProviders } from '../../providers/useBookAuthorsProviders'
import { AuthorListItem } from './AuthorListItem'
import { CreateAuthorModal } from './CreateAuthorModal'
import { Skeleton } from 'antd'
import { useBookProvider } from '../../providers/useBookProvider'
import { useSalesProvider } from '../../providers/useSalesProvider'
import { unwrapApiResponse } from '../../types/api'

type AuthorStats = {
  totalSales: number
  bookCount: number
  avgPerBook: number
}

export function AuthorList() {
  const {
    authors,
    loading,
    loadAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor,
  } = useBookAuthorsProviders()

  const { books, loadBooks } = useBookProvider()
  const { loadAllSales } = useSalesProvider()
  const [authorStats, setAuthorStats] = useState<Record<string, AuthorStats>>({})

  const computeAuthorStats = () => {
    loadAllSales()
      .then(res => {
        const sales = unwrapApiResponse(res.data) as any[]
        // map bookId -> authorId
        const bookToAuthor: Record<string, string> = {}
        books.forEach(b => (bookToAuthor[b.id] = b.author?.id))

        const statsByAuthor: Record<string, { total: number; bookIds: Set<string> }> = {}
        sales.forEach(s => {
          const bookId = s.bookId
          const authorId = bookToAuthor[bookId]
          if (!authorId) return
          if (!statsByAuthor[authorId]) statsByAuthor[authorId] = { total: 0, bookIds: new Set() }
          statsByAuthor[authorId].total += 1
          statsByAuthor[authorId].bookIds.add(bookId)
        })

        const finalStats: Record<string, AuthorStats> = {}
        Object.entries(statsByAuthor).forEach(([aid, s]) => {
          const bookCount = s.bookIds.size || 0
          const totalSales = s.total
          const avgPerBook = bookCount > 0 ? Math.round((totalSales / bookCount) * 100) / 100 : 0
          finalStats[aid] = { totalSales, bookCount, avgPerBook }
        })
        setAuthorStats(finalStats)
      })
      .catch(() => setAuthorStats({}))
  }

  useEffect(() => {
    loadBooks()
    computeAuthorStats()
    // refresh every 5 seconds to catch new sales
    const interval = setInterval(computeAuthorStats, 5000)
    return () => clearInterval(interval)
  }, [books])

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
              onDelete={deleteAuthor}
              onUpdate={updateAuthor}
              salesTotal={authorStats[author.id]?.totalSales ?? 0}
              avgPerBook={authorStats[author.id]?.avgPerBook ?? 0}
              bookCount={authorStats[author.id]?.bookCount ?? 0}
            />
          ))
        )}
      </div>
    </>
  )
}
