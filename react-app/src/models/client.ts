// src/models/client.ts
export interface ClientModel {
  id: string
  firstName: string
  lastName: string
  email?: string
}

export interface CreateClientModel {
  firstName: string
  lastName: string
  email?: string
}

export interface UpdateClientModel {
  firstName?: string
  lastName?: string
  email?: string
}
