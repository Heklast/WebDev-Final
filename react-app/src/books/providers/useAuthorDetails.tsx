import { useState, useEffect } from 'react'
import axios from 'axios'
import type { AuthorModel } from '../AuthorModel'
import type { ApiResponse } from '../types/api'
import { unwrapApiResponse } from '../types/api'

export const useAuthorDetails = (authorId: string) => {
  const [author, setAuthor] = useState<AuthorModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authorId) return

    setLoading(true)
    setError(null)
    axios
      .get<ApiResponse<AuthorModel>>(`http://localhost:3000/authors/${authorId}`)
      .then(res => {
        const body = unwrapApiResponse(res.data)
        setAuthor(body)
      })
      .catch(err => {
        console.error(err)
        setError(err.message || 'Failed to fetch author')
      })
      .finally(() => setLoading(false))
  }, [authorId])

  return { author, loading, error }
}
