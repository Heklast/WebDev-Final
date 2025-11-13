import { useEffect, useState } from 'react'
import {
  Skeleton,
  Space,
  Typography,
  Input,
  Button,
  Select,
  InputNumber,
} from 'antd'
import {
  ArrowLeftOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { BookSalesModal } from './BookSalesModal'
import { useSalesProvider } from '../providers/useSalesProvider'
import type { SaleModel } from '../SaleModel'
import { useClientProvider } from '@/books/providers/useClientProvider'
import type { ClientModel } from '@/books/ClientModel'
import { useBookAuthorsProviders } from '@/books/providers/useBookAuthorsProviders'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook, updateBook } = useBookDetailsProvider(id)
  const { loadBookSales } = useSalesProvider()
  const { clients, loadClients } = useClientProvider()
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const [sales, setSales] = useState<SaleModel[]>([])
  const [isSalesLoading, setSalesLoading] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [authorId, setAuthorId] = useState('')
  const [yearPublished, setYearPublished] = useState<number | undefined>(
    undefined,
  )

  // Load book, sales, clients
  useEffect(() => {
    loadBook()

    setSalesLoading(true)
    loadBookSales(id)
      .then(res => {
        const body = res.data

        const sales: SaleModel[] = Array.isArray(body) ? body : body.data

        setSales(sales)
      })
      .catch(() => setSales([]))
      .finally(() => setSalesLoading(false))

    loadClients()
  }, [id])

  useEffect(() => {
    loadAuthors()
  }, [])

  useEffect(() => {
    if (book) {
      setTitle(book.title)
      setPictureUrl(book.pictureUrl ?? '')
      setAuthorId(book.author.id)
      setYearPublished(book.yearPublished)
    }
  }, [book])

  const onCancelEdit = () => {
    if (!book) return
    setIsEditing(false)
    setTitle(book.title)
    setPictureUrl(book.pictureUrl ?? '')
    setAuthorId(book.author.id)
    setYearPublished(book.yearPublished)
  }

  const onValidateEdit = () => {
    updateBook(id, {
      title,
      pictureUrl: pictureUrl || undefined,
      authorId,
      yearPublished: yearPublished ?? new Date().getFullYear(),
    })
    setIsEditing(false)
  }

  const handleReloadSales = () => {
    setSalesLoading(true)
    loadBookSales(id)
      .then(res => {
        const body = res.data

        const sales: SaleModel[] = Array.isArray(body) ? body : body.data

        setSales(sales)
      })
      .catch(() => setSales([]))
      .finally(() => setSalesLoading(false))
  }

  const resolveClient = (clientId: string): ClientModel | undefined =>
    clients.find((c: ClientModel) => c.id === clientId)

  if (isLoading || !book) {
    return <Skeleton active />
  }

  const authorLabel = `${book.author.firstName} ${book.author.lastName}`

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
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined /> Back to books
      </Link>

      {book.pictureUrl ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}
        >
          <img
            src={book.pictureUrl}
            alt={book.title}
            style={{
              maxHeight: '220px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
            }}
          />
        </div>
      ) : null}

      <div style={{ flex: 1 }}>
        {isEditing ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <Select
              placeholder="Select author"
              value={authorId}
              onChange={value => setAuthorId(value)}
              style={{ width: '100%' }}
              options={authors.map(a => ({
                value: a.id,
                label: `${a.firstName} ${a.lastName}`,
              }))}
            />

            <InputNumber
              placeholder="Year published"
              style={{ width: '100%' }}
              value={yearPublished}
              onChange={value =>
                setYearPublished(typeof value === 'number' ? value : undefined)
              }
            />

            <Input
              placeholder="pictureURL (optional)"
              value={pictureUrl}
              onChange={e => setPictureUrl(e.target.value)}
            />

            <Space>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={onValidateEdit}
                disabled={!title.trim() || !authorId || !yearPublished}
              >
                Save
              </Button>
              <Button icon={<CloseOutlined />} onClick={onCancelEdit}>
                Cancel
              </Button>
            </Space>
          </Space>
        ) : (
          <>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {book.title}
            </Typography.Title>
            <Typography.Text
              style={{
                display: 'block',
                color: '#475569',
                marginBottom: '.25rem',
              }}
            >
              by {authorLabel}
            </Typography.Text>
            <Typography.Text style={{ color: '#64748b' }}>
              Published in {book.yearPublished}
            </Typography.Text>
            <div style={{ marginTop: '.75rem' }}>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            </div>
          </>
        )}
      </div>

      <BookSalesModal bookId={id} onCreated={handleReloadSales} />

      {isSalesLoading && sales.length === 0 ? (
        <Skeleton active />
      ) : sales.length > 0 ? (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography.Title level={4} style={{ marginBottom: '0.75rem' }}>
            Sales
          </Typography.Title>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {sales
              .filter((s: SaleModel) => s.bookId === book.id)
              .map((s: SaleModel) => {
                const client = resolveClient(s.clientId)
                const label = client
                  ? `${client.firstName} ${client.lastName}`
                  : `Client #${s.clientId}`

                return (
                  <li
                    key={s.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '.5rem .75rem',
                      marginBottom: '.5rem',
                      borderRadius: '8px',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '.9rem', color: '#4b5563' }}>
                        {new Date(s.saleDate).toLocaleDateString()}
                      </div>
                      <div style={{ marginTop: '.25rem' }}>
                        <Link
                          to="/clients/$clientId"
                          params={{ clientId: s.clientId }}
                          style={{ color: '#1d4ed8' }}
                        >
                          {label}
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>
      ) : null}
    </Space>
  )
}
