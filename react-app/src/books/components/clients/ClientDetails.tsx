import { useEffect } from 'react'
import { Skeleton, Space, Typography } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as clientsRoute } from '../../../routes/clients'
import { useClientProvider } from '@/books/providers/useClientProvider'
import type { ClientModel } from '@/books/ClientModel'

interface ClientDetailsProps {
  id: string
}

export const ClientDetails = ({ id }: ClientDetailsProps) => {
  const { clients, loading, loadClients } = useClientProvider()

  useEffect(() => {
    loadClients()
  }, [loadClients])

  const client = clients.find((c: ClientModel) => c.id === id)

  if (loading) {
    return <Skeleton active />
  }

  if (!client) {
    return <Typography.Text>Client not found.</Typography.Text>
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Link to={clientsRoute.to}>
        <ArrowLeftOutlined />
      </Link>

      <Typography.Title level={2}>
        {client.firstName} {client.lastName}
      </Typography.Title>

      {client.email ? (
        <Typography.Text>Email: {client.email}</Typography.Text>
      ) : (
        <Typography.Text type="secondary">
          No email provided.
        </Typography.Text>
      )}
    </Space>
  )
}
