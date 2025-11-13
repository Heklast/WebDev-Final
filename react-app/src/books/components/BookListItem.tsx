import { useState } from 'react'
import type { BookModel, UpdateBookModel } from '../BookModel'
import { Button, Col, Row } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Modal } from 'antd'

interface BookListItemProps {
  book: BookModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateBookModel) => void
}

export function BookListItem({ book, onDelete, onUpdate }: BookListItemProps) {
  const [title, setTitle] = useState(book.title)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setTitle(book.title)
  }

  const onValidateEdit = () => {
    onUpdate(book.id, { title })
    setIsEditing(false)
  }

  return (
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
          <input value={title} onChange={e => setTitle(e.target.value)} />
        ) : (
          <Link
            to={`/books/$bookId`}
            params={{ bookId: book.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
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
        <Button
          type="primary"
          danger
          onClick={() =>
            Modal.confirm({
              title: 'Delete book?',
              content: `This will delete "${book.title}".`,
              okType: 'danger',
              onOk: () => onDelete(book.id),
            })
          }
        >
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}
