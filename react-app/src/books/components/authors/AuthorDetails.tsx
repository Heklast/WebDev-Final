import { useAuthorDetailsProvider } from '../../providers/useAuthorDetailsProvider'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Route as authorsRoute } from '../../../routes/authors'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Skeleton, Space, Typography } from 'antd'
import { useBookProvider } from '../../providers/useBookProvider'
import { useSalesProvider } from '../../providers/useSalesProvider'
import type { BookModel } from '../../BookModel'
import { Button } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Input } from 'antd'

import type { SaleModel } from '../../SaleModel'

interface AuthorDetailsProp {
  id: string
}

export const AuthorDetails = ({ id }: AuthorDetailsProp) => {
  const { author, loadAuthor, isLoading, updateAuthor } =
    useAuthorDetailsProvider(id)
  const { books, loadBooks } = useBookProvider()

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const { sales, loadSales, loadBookSales } = useSalesProvider()
  const [averageSales, setAverageSales] = useState(0)

  useEffect(() => {
    loadAuthor()
    loadBooks()
    loadSales()
  }, [id])

  useEffect(() => {
    if (author) {
      setFirstName(author.firstName)
      setLastName(author.lastName)
      setPictureUrl(author.pictureUrl ?? '')
    }
  }, [author])

  useEffect(() => {
    const fetchAverageSales = async () => {
      if (!author) {
        setAverageSales(0)
        return
      }

      const authorBooks: BookModel[] = books.filter(
        book => book.author.id === author.id,
      )
      const salesPerAuthor: SaleModel[] = sales.filter(sale =>
        authorBooks.some(book => book.id === sale.bookId),
      )
      console.log('salesPerAuthor:', salesPerAuthor)
      console.log('authorBooks:', authorBooks)

      if (salesPerAuthor.length === 0) {
        setAverageSales(0)
        return
      }

      if (authorBooks.length === 0) {
        setAverageSales(0)
        return
      }

      try {
        setAverageSales(salesPerAuthor.length / authorBooks.length)
      } catch {
        setAverageSales(0)
      }
    }

    fetchAverageSales()
  }, [author, books, loadBookSales])

  if (isLoading && !author) return <Skeleton active />

  if (!author) return <Typography.Text>Author not found.</Typography.Text>

  const authorBooks: BookModel[] = books.filter(
    book => book.author.id === author.id,
  )

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(author.firstName)
    setLastName(author.lastName)
    setPictureUrl(author.pictureUrl ?? '')
  }

  const onValidateEdit = () => {
    updateAuthor(id, {
      firstName,
      lastName,
      pictureUrl: pictureUrl || undefined,
    })
    setIsEditing(false)
  }

  return (
    <>
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

        <div style={{ flex: 1 }}>
          {isEditing ? (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Input
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <Input
                placeholder="pictureURL (optional)"
                value={pictureUrl}
                onChange={e => setPictureUrl(e.target.value)}
              />
            </Space>
          ) : (
            <>
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {author.firstName} {author.lastName}
              </Typography.Title>
            </>
          )}
        </div>

        {author.pictureUrl && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <img
              src={author.pictureUrl}
              alt={`${author.firstName} ${author.lastName}`}
              style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              }}
            />
          </div>
        )}

        <div
          style={{
            display: 'flex',
            gap: '.5rem',
            alignItems: 'center',
            marginTop: '.5rem',
          }}
        >
          {isEditing ? (
            <>
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          )}
        </div>

        <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
          Average number of sales per book:{' '}
          <strong>{averageSales.toFixed(2)}</strong>
        </Typography.Text>

        {authorBooks.length > 0 ? (
          <div style={{ marginTop: '1.5rem' }}>
            <Typography.Title level={4} style={{ marginBottom: '.75rem' }}>
              Books written by this author
            </Typography.Title>
            <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
              {authorBooks.map(book => (
                <li
                  key={book.id}
                  style={{
                    padding: '.5rem .75rem',
                    marginBottom: '.5rem',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                  }}
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
        )}
      </Space>
    </>
  )
}
