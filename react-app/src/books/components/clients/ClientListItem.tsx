import { useState } from 'react'
import type { ClientModel, UpdateClientModel } from '@/books/ClientModel'
import { Button, Col, Row, Modal, Input } from 'antd'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({
  client,
  onDelete,
  onUpdate,
}: ClientListItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(client.firstName)
  const [lastName, setLastName] = useState(client.lastName)
  const [email, setEmail] = useState(client.email ?? '')
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email ?? '')
  }

  const onValidateEdit = () => {
    onUpdate(client.id, { firstName, lastName, email })
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
          <>
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              style={{ marginRight: '.25rem' }}
              placeholder="First name"
            />
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              style={{ marginRight: '.25rem' }}
              placeholder="Last name"
            />
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email (optional)"
            />
          </>
        ) : (
          <Link
            to="/clients/$clientId"
            params={{ clientId: client.id }}
            style={{
              margin: 'auto 0',
              textAlign: 'left',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>
              {client.firstName} {client.lastName}
            </span>
          </Link>
        )}
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
        <Button type="primary" danger onClick={() =>
            setIsDeleteOpen(true)
          }>
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
          onDelete(client.id)
          setIsDeleteOpen(false)
        }}
      >
        Are you sure you want to delete "{client.firstName} {client.lastName}"?
      </Modal></>
  )
}
