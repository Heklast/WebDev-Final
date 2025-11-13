import { useAuthorDetailsProvider } from '../../providers/useAuthorDetailsProvider'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography } from 'antd'
import { useBookProvider } from '../../providers/useBookProvider'
import type { BookModel } from '../../BookModel'

interface AuthorDetailsProp {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProp) => {
  const { author, loadAuthor, isLoading } = useAuthorDetailsProvider(id)
  const { books, loadBooks } = useBookProvider()

  useEffect(() => {
    loadAuthor()
    loadBooks()
  }, [id])

 if (isLoading && !author) {
    return <Skeleton active />
  }

  if (!author) {
    return <Typography.Text>Author not found.</Typography.Text>
  }

  const authorBooks: BookModel[] = books.filter(
  book => book.author.id === author.id,
  )

  return (
    <Space
      direction="vertical"
      style={{
        textAlign: 'left',
        width: '95%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)',
      }}
    >
      <Link to={authorsRoute.to}>
        <ArrowLeftOutlined /> Back to authors
      </Link>

      {author.pictureUrl ? (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}
        >
          <img
            src={author.pictureUrl}
            alt={`${author.firstName} ${author.lastName}`}
            style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
          />
        </div>
      ) : null}

      <Typography.Title level={2} style={{ marginBottom: 0 }}>
        {author.firstName} {author.lastName}
      </Typography.Title>
      <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
        Total books written: <strong>{authorBooks.length}</strong>
      </Typography.Text>
      
      {books.length > 0 ? (
        authorBooks.length > 0 ? (
          <div style={{ marginTop: '1.5rem' }}>
            <Typography.Title level={4} style={{ marginBottom: '.75rem' }}>
              Books written by this author
            </Typography.Title>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {authorBooks.map(book => (
                <li
                  key={book.id}
                  style={{ padding: '.5rem .75rem', marginBottom: '.5rem', borderRadius: '8px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
                >
                  <Link
                    to="/books/$bookId"
                    params={{ bookId: book.id }}
                    style={{ color: '#1d4ed8', fontWeight: 500 }}
                  >
                    {book.title}
                  </Link>
                  <div
                    style={{
                      fontSize: '.85rem',
                      color: '#4b5563',
                      marginTop: '.15rem',
                    }}
                  >
                    Published in {book.yearPublished}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Typography.Text type="secondary" style={{ marginTop: '1.5rem' }}>
            This author has no books yet.
          </Typography.Text>
        )
      ) : null}

    </Space>
  )
}