import { Injectable } from '@nestjs/common';
import { SaleModel, CreateSaleModel, FilterSalesModel } from './sale.model';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SaleEntity, SaleId } from './entities/sale.entity';
import { ClientId } from '../clients/entities/client.entity';
import { BookId } from '../books/entities/book.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllSales(
    input?: FilterSalesModel,
  ): Promise<[SaleEntity[], number]> {
    const queryBuilder = this.saleRepository
      .createQueryBuilder('sale')
      .leftJoinAndSelect('sale.client', 'client')
      .leftJoinAndSelect('sale.book', 'book')
      .leftJoinAndSelect('book.author', 'author');

    if (input?.sort) {
      const [property, direction] = Object.entries(input.sort)[0];
      queryBuilder.orderBy(`sale.${property}`, direction as 'ASC' | 'DESC');
    } else {
      queryBuilder.orderBy('sale.saleDate', 'DESC');
    }

    if (input?.limit) {
      queryBuilder.take(input.limit);
    }

    if (input?.offset) {
      queryBuilder.skip(input.offset);
    }

    return queryBuilder.getManyAndCount();
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    const saleEntity = this.saleRepository.create({
      clientId: sale.clientId as ClientId,
      bookId: sale.bookId as BookId,
      saleDate: sale.saleDate,
    });
    return this.saleRepository.save(saleEntity);
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }

  public async getSaleById(id: string): Promise<SaleEntity | undefined> {
    const sale = await this.saleRepository.findOne({
      where: { id: id as SaleId },
      relations: ['client', 'book', 'book.author'],
    });

    if (!sale) {
      return undefined;
    }

    return sale;
  }

  public async getSalesByClient(clientId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { clientId: clientId as ClientId },
      relations: ['book', 'book.author'],
      order: {
        saleDate: 'DESC',
      },
    });
  }

  public async getSalesByBook(bookId: string): Promise<SaleEntity[]> {
    return this.saleRepository.find({
      where: { bookId: bookId as BookId },
      relations: ['client'],
      order: {
        saleDate: 'DESC',
      },
    });
  }

  public async countSalesByClient(clientId: string): Promise<number> {
    return this.saleRepository.count({
      where: { clientId: clientId as ClientId },
    });
  }

  public async countSalesByBook(bookId: string): Promise<number> {
    return this.saleRepository.count({
      where: { bookId: bookId as BookId },
    });
  }
}