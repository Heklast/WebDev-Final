import { Injectable } from '@nestjs/common';
import {
  SaleModel,
  CreateSaleModel,
  FilterSalesModel,
} from './sale.model';
import { SaleRepository } from './sale.repository';
import { SaleEntity } from './entities/sale.entity';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public async getAllSales(
    input?: FilterSalesModel,
  ): Promise<[SaleEntity[], number]> {
    return this.saleRepository.getAllSales(input);
  }

  public async getSaleById(id: string): Promise<SaleEntity | undefined> {
    return this.saleRepository.getSaleById(id);
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.createSale(sale);
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.deleteSale(id);
  }

  public async getSalesByClient(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.getSalesByClient(clientId);
  }

  public async getSalesByBook(bookId: string): Promise<SaleEntity[]> {
    return this.saleRepository.getSalesByBook(bookId);
  }
}