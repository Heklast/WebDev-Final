import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { SaleRepository } from './sale.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
})
export class SaleModule {}