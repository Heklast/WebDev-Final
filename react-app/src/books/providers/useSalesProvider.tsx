import axios from 'axios'
import type { CreateSaleModel, SaleModel } from '../SaleModel'
import { useState } from 'react'
import type { BookModel } from '../BookModel'

export const useSalesProvider = () => {
  const [sales, setSales] = useState<SaleModel[]>([]) //breytti BookModel í SaleModel
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
    const id = bookId
    return axios.get<SaleModel[] | { data: SaleModel[] }>(
      `http://localhost:3000/sales?bookId/sales`,
    )
  }
  return { sales, loadSales, createSale, loadBookSales }
}
