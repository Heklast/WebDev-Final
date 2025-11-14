import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row, Input } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Modal } from 'antd'
import { useSalesProvider } from '../providers/useSalesProvider'
import { Typography } from 'antd'
import { useEffect } from 'react'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [pictureUrl, setPictureUrl] = useState(book.pictureUrl ?? '')
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const {sales, loadSales} = useSalesProvider();

  useEffect(() => {
    loadSales()
  }, [loadSales])

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
    setPictureUrl(book.pictureUrl ?? '')
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title, pictureUrl: pictureUrl || undefined })
    setIsEditing(false)
  }

   const bookSales = sales.filter(
    sale => sale.bookId === book.id,
  ).length

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
        <Col span={12} style={{ margin: 'auto 0' }}>
          {isEditing ? (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
            >
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Book title"
                style={{ width: '100%', maxWidth: '250px' }}
              />
              <Button type="primary" onClick={onValidateEdit}>
                <CheckOutlined />
              </Button>
              <Button onClick={onCancelEdit}>
                <CloseOutlined />
              </Button>
            </div>
          ) : (
            <Link
              to={`/books/$bookId`}
              params={{ bookId: book.id }}
              style={{ margin: 'auto 0', textAlign: 'left' }}
            >
              <span style={{ fontWeight: 'bold' }}>{book.title}</span> -{' '}
              {book.yearPublished}
            </Link>
          )}
        </Col>
        <Col span={9} style={{ margin: 'auto 0' }}>
          by <span style={{ fontWeight: 'bold' }}>{book.author.firstName}</span>{' '}
          <span style={{ fontWeight: 'bold' }}>{book.author.lastName}</span>
        </Col>
        <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
               Total copies sold: <strong>{bookSales}</strong>
        </Typography.Text>
        <Col
          span={3}
          style={{
            alignItems: 'right',
            display: 'flex',
            gap: '.25rem',
            margin: 'auto 0',
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
              <EditOutlined />
            </Button>
          )}
          <Button type="primary" danger onClick={() => setIsDeleteOpen(true)}>
            <DeleteOutlined />
          </Button>
        </Col>
      </Row>
      <Modal
        open={isDeleteOpen}
        title="Delete author"
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
