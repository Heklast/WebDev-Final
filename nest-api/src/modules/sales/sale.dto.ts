import { IsDateString, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { ClientId } from '../clients/entities/client.entity';
import type { BookId } from '../books/entities/book.entity';

export class CreateSaleDto {
  @IsUUID(4)
  clientId: ClientId;

  @IsUUID(4)
  bookId: BookId;

  @IsDateString()
  saleDate: string;
}

export class GetSalesDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsString()
  @IsOptional()
  sort?: string;
}