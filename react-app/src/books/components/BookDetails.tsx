import { useEffect, useState } from 'react'
import { Skeleton, Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { BookSalesModal } from './BookSalesModal'
import { useSalesProvider } from '../providers/useSalesProvider'
import type { SaleModel } from '../SaleModel'
import { useClientProvider } from '@/books/providers/useClientProvider'
import type { ClientModel } from '@/books/ClientModel'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)
  const { loadBookSales } = useSalesProvider()
  const { clients, loadClients } = useClientProvider()

  const [sales, setSales] = useState<SaleModel[]>([])
  const [isSalesLoading, setIsSalesLoading] = useState(false)

  useEffect(() => {
    loadBook()

    setIsSalesLoading(true)
    loadBookSales(id)
      .then(res => {
        const data = (res.data as any).data ?? res.data
        setSales(data as SaleModel[])
      })
      .catch(() => setSales([]))
      .finally(() => setIsSalesLoading(false))

    loadClients()
  }, [id])

  const handleReloadSales = () => {
    setIsSalesLoading(true)
    loadBookSales(id)
      .then(res => {
        const data = (res.data as any).data ?? res.data
        setSales(data as SaleModel[])
      })
      .catch(() => setSales([]))
      .finally(() => setIsSalesLoading(false))
  }

  const resolveClient = (clientId: string): ClientModel | undefined =>
    clients.find((c: ClientModel) => c.id === clientId)

  if (isLoading) {
    return <Skeleton active />
  }

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

      {book?.pictureUrl ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
         <img src={book.pictureUrl} alt={book.title} 
            style={{ maxHeight: '220px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 10px rgba(0,0,0,0.08)' }}
        />
        </div>
      ) : null}

      <Typography.Title level={1} style={{ marginBottom: 0 }}>{book?.title}</Typography.Title>
      <Typography.Title level={3} style={{ color: '#1d4ed8' }}>{book?.yearPublished}</Typography.Title>

      <BookSalesModal bookId={id} onCreated={handleReloadSales}/>

      {isSalesLoading && sales.length === 0 ? (
        <Skeleton active />
      ) : sales.length > 0 ? (
        <div style={{ marginTop: '1.5rem' }}>
          <Typography.Title level={4} style={{ marginBottom: '0.75rem' }}>
            Sales
          </Typography.Title>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            {sales.map((s: SaleModel) => {
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
                      {new Date(s.date).toLocaleString()}
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
