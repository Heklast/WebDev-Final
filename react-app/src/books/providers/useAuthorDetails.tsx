import { useState, useEffect } from 'react'
import axios from 'axios'
import type { AuthorModel } from '../AuthorModel'

export const useAuthorDetails = (authorId: string) => {
  const [author, setAuthor] = useState<AuthorModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authorId) return

    setLoading(true)
    setError(null)

    axios
      .get<AuthorModel | { data: AuthorModel }>(
        `http://localhost:3000/authors/${authorId}`,
      )
      .then(res => {
        const body = res.data

        const parsed: AuthorModel = 'data' in body ? body.data : body

        setAuthor(parsed)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to fetch author')
      })
      .finally(() => setLoading(false))
  }, [authorId])

  return { author, loading, error }
}
