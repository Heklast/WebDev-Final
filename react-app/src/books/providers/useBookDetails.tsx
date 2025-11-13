import { useState, useEffect } from 'react'
import axios from 'axios'
import type { BookModel } from '../BookModel'

export const useBookDetails = (bookId: string) => {
  const [book, setBook] = useState<BookModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!bookId) return

    setLoading(true)
    setError(null)
    axios
      .get(`http://localhost:3000/books/${bookId}`)
      .then(res => {
        const body = res.data
        const parsed: BookModel = 'data' in body ? body.data : body

        setBook(parsed)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to fetch book')
      })
      .finally(() => setLoading(false))
  }, [bookId])

  return { book, loading, error }
}
