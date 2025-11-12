import { Skeleton, Space, Typography } from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import { BookSalesModal } from './BookSalesModal'
import { useSalesProvider } from '../providers/useSalesProvider'
import type { SaleModel } from '../SaleModel'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps) => {
  const { isLoading, book, loadBook } = useBookDetailsProvider(id)

  const { loadBookSales } = useSalesProvider()
  const [sales, setSales] = useState<SaleModel[]>([])

  useEffect(() => {
    loadBook()

    loadBookSales(id)
      .then(res => {
        const data = (res.data as any).data ?? res.data
        setSales(data as SaleModel[])
      })
      .catch(() => setSales([]))
  }, [id])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{book?.title}</Typography.Title>
      <Typography.Title level={3}>{book?.yearPublished}</Typography.Title>

      <BookSalesModal
        bookId={id}
        onCreated={() => {
          loadBookSales(id)
            .then(res => {
              const data = (res.data as any).data ?? res.data
              setSales(data as SaleModel[])
            })
            .catch(() => setSales([]))
        }}
      />

      {sales.length > 0 ? (
        <div style={{ marginTop: '1rem' }}>
          <Typography.Title level={4}>Sales</Typography.Title>
          <ul style={{ paddingLeft: '1rem' }}>
            {sales.map(s => (
              <li key={s.id}>
                <span>{new Date(s.date).toLocaleString()}</span> — client #
                {s.clientId}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Space>
  )
}
