import { Button, Input } from 'antd'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import type { ClientModel, UpdateClientModel } from '@/models/client'

interface Props {
  client: ClientModel
  onDelete: (id: string) => void
  onUpdate: (id: string, input: UpdateClientModel) => void
}

export function ClientListItem({ client, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email ?? '',
  })

  const handleSave = () => {
    onUpdate(client.id, form)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="flex gap-2">
        <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="(optional)" />
        <Button type="primary" onClick={handleSave}>Save</Button>
        <Button onClick={() => setEditing(false)}>Cancel</Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/clients/$clientId"
        params={{ clientId: client.id }}
      >
        {client.firstName} {client.lastName}
      </Link>
      <Button onClick={() => setEditing(true)}>Edit</Button>
      <Button danger onClick={() => onDelete(client.id)}>Delete</Button>
    </div>
  )
}
