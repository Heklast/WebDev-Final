import { useState } from 'react'
import { Button, Input, Modal, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { CreateClientModel } from '@/books/ClientModel'
import { Typography } from 'antd'

interface CreateClientModalProps {
  onCreate: (input: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: CreateClientModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPictureUrl('')
    setIsOpen(false)
  }

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Client
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          const input: CreateClientModel = {
            firstName,
            lastName,
            email: email || undefined,
            pictureUrl: pictureUrl || undefined,
          }
          onCreate(input)
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName?.length || !lastName?.length,
        }}
        title="Create Client"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text strong>First name</Typography.Text>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          <Typography.Text strong>Last name</Typography.Text>
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          <Typography.Text strong>Email (optional)</Typography.Text>
          <Input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Typography.Text strong>Picture URL (optional)</Typography.Text>
          <Input
            type="text"
            placeholder="Picture URL (optional)"
            value={pictureUrl}
            onChange={e => setPictureUrl(e.target.value)}
          />
        </Space>
      </Modal>
    </>
  )
}
