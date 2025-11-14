export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
  pictureUrl?: string
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  pictureUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
