import axios from 'axios'
import type { CreateSaleModel, SaleModel } from '../SaleModel'

export const useSalesProvider = () => {
  const createSale = (input: CreateSaleModel) => {
    return axios.post('http://localhost:3000/sales', input)
  }

  const loadBookSales = (bookId: string) => {
    return axios.get<SaleModel[] | { data: SaleModel[] }>(
      `http://localhost:3000/sales?bookId/sales`,
    )
  }
  return { createSale, loadBookSales }
}
