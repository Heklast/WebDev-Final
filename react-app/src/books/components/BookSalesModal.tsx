// Provisional until CLient is done and check later
import { useEffect, useState } from 'react'
import { Button, Modal, Select, DatePicker, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useClientProvider } from '../providers/useClientProvider'
import { useSalesProvider } from '../providers/useSalesProvider'
import type { ClientModel } from '../ClientModel'
import dayjs from 'dayjs'

interface BookSalesModalProps {
  bookId: string
  onCreated?: () => void
}

export function BookSalesModal({ bookId, onCreated }: BookSalesModalProps) {
  const [open, setOpen] = useState(false)
  const [clientId, setClientId] = useState<string>('')
  const [saleDate, setDate] = useState<Date | null>(null)

  const { clients, loadClients } = useClientProvider()
  const { createSale } = useSalesProvider()

  const onClose = () => {
    setClientId('')
    setDate(new Date())
    setOpen(false)
  }

  useEffect(() => {
    if (open && clients.length === 0) {
      loadClients()
    }
  }, [open, clients.length, loadClients])

  const onOk = async () => {
    await createSale({
      bookId,
      clientId,
      saleDate: saleDate!,
    })
    onClose()
    onCreated?.()
  }

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
      >
        Create Sale
      </Button>
      <Modal
        open={open}
        onCancel={onClose}
        onOk={onOk}
        okButtonProps={{ disabled: !clientId || !saleDate }}
        title="Create Sale"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select<string>
            style={{ width: '100%' }}
            placeholder="Select a client"
            options={clients.map((c: ClientModel) => ({
              label: `${c.firstName} ${c.lastName}`,
              value: c.id,
            }))}
            value={clientId || undefined}
            onChange={(value: string) => setClientId(value)}
          />
          <DatePicker
            style={{ width: '100%' }}
            value={saleDate ? dayjs(saleDate) : null}
            onChange={(date /* Dayjs | null */) => {
              setDate(date ? date.toDate() : null)
            }}
          />
        </Space>
      </Modal>
    </>
  )
}
