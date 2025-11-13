export type SaleModel = {
  id: string
  bookId: string
  clientId: string
  saleDate: Date
}

export type CreateSaleModel = {
  bookId: string
  clientId: string
  saleDate: Date
}
