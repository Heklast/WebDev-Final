// Provisional until CLient is done and check later
import { useEffect, useState } from 'react'
import { Button, Modal, Select, DatePicker, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useClientProvider } from '../common/providers/useClientProvider' // Path not confiemed yet awaiting CLient to be done
import { useSalesProvider } from '../providers/useSalesProvider'
import type { ClientModel } from '../ClientModel' // Path not confiemed yet awaiting CLient to be done

interface BookSalesModalProps {
  bookId: string
  onCreated?: () => void
}

export function BookSalesModal({ bookId, onCreated }: BookSalesModalProps) {
  const [open, setOpen] = useState(false)
  const [clientId, setClientId] = useState<string>('')            
  const [date, setDate] = useState<string>('')

  const { clients, loadClients } = useClientProvider()            
  const { createSale } = useSalesProvider()

  const onClose = () => {
    setClientId('')
    setDate('')
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
      date: new Date(date).toISOString(),
    })
    onClose()
    onCreated?.()
  }

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
        Create Sale
      </Button>
      <Modal
        open={open}
        onCancel={onClose}
        onOk={onOk}
        okButtonProps={{ disabled: !clientId || !date }}
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
            onChange={(_, dateString) =>
              setDate(Array.isArray(dateString) ? (dateString[0] ?? '') : dateString)
            }
          />
        </Space>
      </Modal>
    </>
  )
}
