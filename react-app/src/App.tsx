import { Typography, Input, Button, Space, Card } from 'antd'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [newName, setNewName] = useState('')

  const onValidate = () => {
    setName(newName)
    setNewName('')
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        padding: '2rem',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          borderRadius: '12px',
          padding: '1.5rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        }}
      >
        <Typography.Title level={2} style={{ color: '#1d4ed8' }}>
          Welcome to Babel’s Library
        </Typography.Title>

        <Typography.Text type="secondary">
          Discover books, authors, clients and more.
        </Typography.Text>

        <Space direction="vertical" style={{ width: '100%', marginTop: '2rem' }}>
          <Input
            placeholder="Enter your name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <Button type="primary" onClick={onValidate}>
            OK
          </Button>

          {name && (
            <Typography.Title
              level={4}
              style={{ marginTop: '1rem', color: '#1e3a8a' }}
            >
              Hello, {name}!
            </Typography.Title>
          )}
        </Space>
      </Card>
    </div>
  )
}

export default App
