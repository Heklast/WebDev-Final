import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientEntity, type ClientId } from '../../clients/entities/client.entity';
import { BookEntity, type BookId } from '../../books/entities/book.entity';

export type SaleId = string & { __brand: 'Sale' };

@Entity('sales')
export class SaleEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: SaleId;

  @Column({ name: 'client_id', type: 'uuid' })
  clientId: ClientId;

  @Column({ name: 'book_id', type: 'uuid' })
  bookId: BookId;

  @Column({ name: 'sale_date', type: 'datetime' })
  saleDate: Date;

  @ManyToOne(() => ClientEntity, (client) => client.sales, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: ClientEntity;

  @ManyToOne(() => BookEntity, (book) => book.sales, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: BookEntity;
}