import { useEffect, useState } from 'react'
import { Button, Input, Skeleton, Space, Typography } from 'antd'
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../../routes/clients'
import { useClientProvider } from '@/books/providers/useClientProvider'
import type { ClientModel } from '@/books/ClientModel'
import { useSalesProvider } from '../../providers/useSalesProvider'
import type { SaleModel } from '../../SaleModel'
import { useBookProvider } from '../../providers/useBookProvider'
import type { BookModel } from '../../BookModel'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { clients, loading, loadClients, updateClient } = useClientProvider()
  const { loadClientSales } = useSalesProvider()
  const { books, loadBooks } = useBookProvider()

  const [sales, setSales] = useState<SaleModel[]>([])
  const [salesLoading, setSalesLoading] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    loadClients()
    loadBooks()

    setSalesLoading(true)
    loadClientSales(id)
      .then(res => {
        const data = (res.data as any).data ?? res.data
        setSales(data as SaleModel[])
      })
      .catch(() => setSales([]))
      .finally(() => setSalesLoading(false))
  }, [id])

  const client = clients.find((c: ClientModel) => c.id === id)

  useEffect(() => {
    if (client) {
      setFirstName(client.firstName)
      setLastName(client.lastName)
      setEmail(client.email ?? '')
    }
  }, [client])

  if (loading && !client) {
    return <Skeleton active />
  }

  if (!client) {
    return <Typography.Text>Client not found.</Typography.Text>
  }

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email ?? '')
  }

  const onValidateEdit = () => {
    updateClient(id, {
      firstName,
      lastName,
      email: email || undefined,
    })
    setIsEditing(false)
  }

  const resolveBook = (bookId: string): BookModel | undefined =>
    books.find((b: BookModel) => b.id === bookId)

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
      <Link to={clientsRoute.to}>
        <ArrowLeftOutlined /> Back to clients
      </Link>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'flex-start',
        }}
      >
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
                placeholder="Email (optional)"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Space>
          ) : (
            <>
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {client.firstName} {client.lastName}
              </Typography.Title>
              {client.email ? (
                <Typography.Text>{client.email}</Typography.Text>
              ) : (
                <Typography.Text type="secondary">
                  No email provided.
                </Typography.Text>
              )}
            </>
          )}
        </div>

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
      </div>
      {salesLoading && sales.length === 0 ? (
        <Skeleton active />
      ) : sales.length > 0 ? (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography.Title level={4} style={{ marginBottom: '0.75rem' }}>
            Books bought by this client
          </Typography.Title>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {sales.map((s: SaleModel) => {
              const book = resolveBook(s.bookId)
              const label = book
                ? `${book.title} – ${book.author.firstName} ${book.author.lastName}`
                : `Book #${s.bookId}`

              return (
                <li
                  key={s.id}
                  style={{
                    padding: '.5rem .75rem',
                    marginBottom: '.5rem',
                    borderRadius: '8px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #e5e7eb',
                  }}
                >
                  <div>
                    <Link
                      to="/books/$bookId"
                      params={{ bookId: s.bookId }}
                      style={{ color: '#1d4ed8', fontWeight: 500 }}
                    >
                      {label}
                    </Link>
                    <div
                      style={{
                        fontSize: '.85rem',
                        color: '#4b5563',
                        marginTop: '.25rem',
                      }}
                    >
                      {new Date(s.date).toLocaleString()}
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
