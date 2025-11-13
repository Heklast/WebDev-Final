import { useState } from 'react'
import type { AuthorModel } from '../AuthorModel'
import axios from 'axios'
import type { UpdateAuthorModel } from '../AuthorModel'

export const useAuthorDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [author, setAuthor] = useState<AuthorModel | null>(null)

  const loadAuthor = () => {
    setIsLoading(true)
    fetch(`http://localhost:3000/authors/${id}`)
      .then(response => response.json())
      .then(data => setAuthor(data))
      .finally(() => setIsLoading(false))
  }
  const updateAuthor = (id: string, input: UpdateAuthorModel) => {
    axios
      .patch(`http://localhost:3000/authors/${id}`, input)
      .then(() => loadAuthor())
      .catch(err => console.error(err))
  }

  return { isLoading, author, loadAuthor, updateAuthor }
}
