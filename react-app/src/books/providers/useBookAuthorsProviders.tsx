import { useState } from 'react'
import axios from 'axios'
import type {
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../AuthorModel'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])
  const [loading, setLoading] = useState(false)

  const loadAuthors = () => {
    setLoading(true)
    axios
      .get('http://localhost:3000/authors')
      .then(data => {
        setAuthors(data.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  const createAuthor = (author: CreateAuthorModel) => {
    axios
      .post('http://localhost:3000/authors', author)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  const deleteAuthor = (id: string) => {
    axios
      .delete(`http://localhost:3000/authors/${id}`)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  const updateAuthor = (id: string, input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => {
        loadAuthors()
      })
      .catch(err => console.error(err))
  }

  return {
    authors,
    loading,
    loadAuthors,
    createAuthor,
    deleteAuthor,
    updateAuthor,
  }
}
