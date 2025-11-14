import { useState, useEffect } from 'react'
import type { BookModel } from '../BookModel'
import { Button, Col, Row, Modal, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { useSalesProvider } from '../providers/useSalesProvider'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
}

export function BookListItem({ book, onDelete }: BookListItemProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { sales, loadSales } = useSalesProvider()

  useEffect(() => {
    loadSales()
  }, [loadSales])

  const bookSales = sales.filter(sale => sale.bookId === book.id).length

  return (
    <>
      <Row
        style={{
          width: '100%',
          minHeight: '60px',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          margin: '0.75rem 0',
          padding: '.5rem .75rem',
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid #e0e7ff',
          boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
        }}
      >
        <Col
          span={12}
          style={{
            margin: 'auto 0',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <>
            <Link
              to="/books/$bookId"
              params={{ bookId: book.id }}
              style={{
                margin: 'auto 0',
                textAlign: 'left',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {book.title}
              </span>
              <span style={{ marginLeft: '.5rem', color: '#555' }}>
                ({"by "}{book.author.firstName} {book.author.lastName})
              </span>
            </Link>

            <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
              Total copies sold: <strong>{bookSales}</strong>
            </Typography.Text>
          </>
        </Col>

        {/* RIGHT: delete button – same structure as ClientListItem */}
        <Col
          span={4}
          style={{
            alignItems: 'right',
            display: 'flex',
            gap: '.25rem',
            margin: 'auto 0',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="primary" danger onClick={() => setIsDeleteOpen(true)}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>

      <Modal
        open={isDeleteOpen}
        title="Delete book"
        onCancel={() => setIsDeleteOpen(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        onOk={() => {
          onDelete(book.id)
          setIsDeleteOpen(false)
        }}
      >
        Are you sure you want to delete the book: {book.title}?
      </Modal>
    </>
  )
}
