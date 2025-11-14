import type { AuthorModel } from '../../AuthorModel'
import { Link } from '@tanstack/react-router'
import { Button, Col, Row, Modal, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import type { BookModel } from '../../BookModel'
import { useState } from 'react'

export interface AuthorListItemParams {
  author: AuthorModel
  books: BookModel[]
  onDelete: (id: string) => void
}

export function AuthorListItem({
  author,
  books,
  onDelete,
}: AuthorListItemParams) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const authorBooks = books.filter(book => book.author.id === author.id).length

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
              to="/authors/$authorId"
              params={{ authorId: author.id }}
              style={{
                margin: 'auto 0',
                textAlign: 'left',
              }}
            >
              <span style={{ fontWeight: 'bold' }}>
                {author.firstName} {author.lastName}
              </span>
            </Link>

            <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
              Total books written: <strong>{authorBooks}</strong>
            </Typography.Text>
          </>
        </Col>

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
        title="Delete author"
        onCancel={() => setIsDeleteOpen(false)}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        onOk={() => {
          onDelete(author.id)
          setIsDeleteOpen(false)
        }}
      >
        Are you sure you want to delete the author: {author.firstName}{' '}
        {author.lastName}?
      </Modal>
    </>
  )
}
