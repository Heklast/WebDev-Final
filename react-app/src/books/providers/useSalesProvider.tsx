import axios from 'axios'
import type { CreateSaleModel, SaleModel } from '../SaleModel'
import type { ApiResponse } from '../types/api'

export const useSalesProvider = () => {
  const createSale = (input: CreateSaleModel) => {
    return axios.post('http://localhost:3000/sales', input)
  }

  const loadBookSales = (bookId: string) => {
    // returns sales for a given bookId
    return axios.get<ApiResponse<SaleModel[]>>(
      `http://localhost:3000/sales?bookId=${bookId}`,
    )
  }

  const loadClientSales = (clientId: string) => {
    // returns sales for a given client
    return axios.get<ApiResponse<SaleModel[]>>(
      `http://localhost:3000/clients/${clientId}/sales`,
    )
  }

  const loadAllSales = () => {
    return axios.get<ApiResponse<SaleModel[]>>(`http://localhost:3000/sales`)
  }

  return { createSale, loadBookSales, loadClientSales, loadAllSales }
}
