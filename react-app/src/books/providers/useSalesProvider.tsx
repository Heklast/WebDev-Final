import { useState } from 'react'
import axios from 'axios'
import type { CreateSaleModel, SaleModel } from '../SaleModel'

export const useSalesProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([])
  const [loading, setLoading] = useState(false)

  const createSale = (input: CreateSaleModel) => {
    return axios.post('http://localhost:3000/sales', input)
  }

  const loadSales = () => {
    setLoading(true)
    return axios
      .get('http://localhost:3000/sales')
      .then(data => {
        setSales(data.data.data)
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }

  const loadBookSales = (bookId: string) => {
    return axios.get<SaleModel[] | { data: SaleModel[] }>(
      `http://localhost:3000/books/${bookId}/sales`,
    )
  }

  return { sales, loading, loadSales, createSale, loadBookSales }
}
