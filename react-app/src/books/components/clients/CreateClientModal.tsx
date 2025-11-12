import { Modal, Input, Form } from 'antd'
import { useState } from 'react'
import type { CreateClientModel } from '@/books/ClientModel'

interface Props {
  onCreate: (input: CreateClientModel) => void
}

export function CreateClientModal({ onCreate }: Props) {
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = async () => {
    const values = await form.validateFields()
    onCreate(values)
    setOpen(false)
    form.resetFields()
  }

  return (
    <>
      <button onClick={() => setOpen(true)}>Create Client</button>
      <Modal
        title="Create Client"
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        okButtonProps={{
          disabled:
            !form.getFieldValue('firstName') || !form.getFieldValue('lastName'),
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
