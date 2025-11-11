import { SaleId } from './entities/sale.entity';
import { ClientId } from '../clients/entities/client.entity';
import { BookId } from '../books/entities/book.entity';

export type SaleModel = {
  id: SaleId;
  clientId: ClientId;
  bookId: BookId;
  saleDate: Date;
};

export type CreateSaleModel = {
  clientId: string;
  bookId: string;
  saleDate: Date;
};

export type FilterSalesModel = {
  limit?: number;
  offset?: number;
  sort?: {
    [key: string]: 'ASC' | 'DESC';
  };
};

export type GetSalesModel = {
  data: SaleModel[];
  totalCount: number;
};