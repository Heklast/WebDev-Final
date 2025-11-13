import { useEffect, useState } from 'react'
import type { CreateAuthorModel } from '../../AuthorModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface CreateAuthorModalProps {
  onCreate: (author: CreateAuthorModel) => void
}

export function CreateAuthorModal({ onCreate }: CreateAuthorModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')

  const onClose = () => {
    setFirstName('')
    setLastName('')
    setPictureUrl('')
    setIsOpen(false)
  }

  useEffect(() => {
    // const [firstName, setFirstName] = useState('')
  }, [isOpen])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Author
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          onCreate({
            firstName,
            lastName,
            pictureUrl: pictureUrl || undefined,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !firstName?.length || !lastName.length,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />

          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
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