import type { AuthorModel, UpdateAuthorModel } from '../../AuthorModel'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button, Col, Row, Input} from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'

export interface AuthorListItemParams {
  author: AuthorModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateAuthorModel) => void
  salesTotal?: number
  avgPerBook?: number
  bookCount?: number
}

export function AuthorListItem({
  author,
  onDelete,
  onUpdate,
  salesTotal = 0,
  avgPerBook = 0,
  bookCount = 0,
}: AuthorListItemParams) {
  const [firstName, setFirstName] = useState(author.firstName)
  const [lastName, setLastName] = useState(author.lastName)
  const [pictureUrl, setPictureUrl] = useState(author.pictureUrl ?? '')
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(author.firstName)
    setLastName(author.lastName)
    setPictureUrl(author.pictureUrl ?? '')
  }

  const onValidateEdit = () => {
    onUpdate(author.id, { firstName, lastName, pictureUrl: pictureUrl || undefined })
    setIsEditing(false)
  }
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
  <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', width: '100%', maxWidth: '350px' }}>
    <Input
      value={firstName}
      onChange={e => setFirstName(e.target.value)}
      placeholder="First Name"
    />
    <Input
      value={lastName}
      onChange={e => setLastName(e.target.value)}
      placeholder="Last Name"
    />
    <Input
      value={pictureUrl}
      onChange={e => setPictureUrl(e.target.value)}
      placeholder="Picture URL (optional)"
    />
  </div>
) : (
          <Link
            to={`/authors/$authorId`}
            params={{ authorId: author.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{author.lastName}</span>
          </Link>
        )}
      </Col>
      <Col span={6} style={{ margin: 'auto 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div style={{ textAlign: 'right', color: '#374151' }}>
          <div style={{ fontWeight: 600 }}>{salesTotal} sold</div>
          <div style={{ fontSize: '.85rem', color: '#6b7280' }}>{bookCount} books · {avgPerBook} avg/book</div>
        </div>
      </Col>

      <Col
        span={6}
        style={{ alignItems: 'right', display: 'flex', gap: '.25rem', margin: 'auto 0' }}
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
            setIsDeleteOpen(true)
          }
        >
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
        Are you sure you want to delete "{author.firstName} {author.lastName}"?
      </Modal></>
  )
}
