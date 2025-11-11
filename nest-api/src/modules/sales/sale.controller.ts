import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSaleDto, GetSalesDto } from './sale.dto';
import { GetSalesModel } from './sale.model';
import { SaleService } from './sale.service';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  async getSales(@Query() input: GetSalesDto): Promise<GetSalesModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['saleDate', 'DESC'];

    const [sales, totalCount] = await this.saleService.getAllSales({
      ...input,
      sort: {
        [property]: direction as 'ASC' | 'DESC',
      },
    });

    return {
      data: sales,
      totalCount,
    };
  }

  @Get(':id')
  public async getSale(@Param('id') id: string) {
    return this.saleService.getSaleById(id);
  }

  @Get('client/:clientId')
  public async getSalesByClient(@Param('clientId') clientId: string) {
    return this.saleService.getSalesByClient(clientId);
  }

  @Get('book/:bookId')
  public async getSalesByBook(@Param('bookId') bookId: string) {
    return this.saleService.getSalesByBook(bookId);
  }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    const saleDate = new Date(createSaleDto.saleDate);
    return this.saleService.createSale({
      ...createSaleDto,
      saleDate,
    });
  }

  @Delete(':id')
  deleteSale(@Param('id') id: string) {
    return this.saleService.deleteSale(id);
  }
}