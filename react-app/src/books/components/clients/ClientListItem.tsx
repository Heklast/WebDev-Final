import { useState } from 'react'
import type { ClientModel } from '@/books/ClientModel'
import { Button, Col, Row, Modal } from 'antd'
import {
  DeleteOutlined,
} from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Typography } from 'antd'
import { useSalesProvider } from '../../providers/useSalesProvider'
import { useEffect } from 'react'

interface ClientListItemProps {
  client: ClientModel
  onDelete: (id: string) => void
}

export function ClientListItem({
  client,
  onDelete,
}: ClientListItemProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const {sales, loadSales} = useSalesProvider();

  useEffect(() => {
    loadSales()
  }, [loadSales])

  console.log("Sales in ClientListItem:", sales);

   const clientSales = sales.filter(
    sale => sale.clientId === client.id,
  ).length

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
><>
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
          <Typography.Text style={{ fontSize: '1rem', color: '#475569' }}>
               Total books bought: <strong>{clientSales}</strong>
        </Typography.Text></>
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
          onDelete(client.id)
          setIsDeleteOpen(false)
        }}
      >
        Are you sure you want to delete the client: {client.firstName}{' '}
        {client.lastName}?
      </Modal>
    </>
  )
}
