import { useAuthorDetailsProvider } from '../../providers/useAuthorDetailsProvider'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { ArrowLeftOutlined } from '@ant-design/icons'

interface AuthorDetailsProp {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProp) => {
  const { author, loadAuthor } = useAuthorDetailsProvider(id)

  useEffect(() => {
    loadAuthor()
  }, [id])

  return (
    <>
      <Link to={authorsRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <p> {author?.firstName}</p>
    </>
  )
}
