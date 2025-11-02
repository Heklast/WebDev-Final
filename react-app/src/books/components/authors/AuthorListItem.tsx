import type { AuthorModel, UpdateAuthorModel } from '../../AuthorModel'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button, Col, Row } from 'antd'
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'


export interface AuthorListItemParams {
  author: AuthorModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateAuthorModel) => void
}

export function AuthorListItem({ author, onDelete, onUpdate }: AuthorListItemParams) {
  const [firstName, setFirstName] = useState(author.firstName)
  const [lastName, setLastName] = useState(author.lastName)
  const [isEditing, setIsEditing] = useState(false)

  const onCancelEdit = () => {
    setIsEditing(false)
    setFirstName(author.firstName)
    setLastName(author.lastName)
  }

  const onValidateEdit = () => {
    onUpdate(author.id, { firstName, lastName })
    setIsEditing(false)
  }
  return (

    <Row
      style={{
        width: '100%',
        height: '50px',
        borderRadius: '10px',
        backgroundColor: '#EEEEEE',
        margin: '1rem 0',
        padding: '.25rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Col span={12} style={{ margin: 'auto 0' }}>
        {isEditing ? (
          <>
            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input value={lastName} onChange={e => setLastName(e.target.value)} /></>
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
        <Button type="primary" danger onClick={() => onDelete(author.id)}>
          <DeleteOutlined />
        </Button>
      </Col>
    </Row>
  )
}