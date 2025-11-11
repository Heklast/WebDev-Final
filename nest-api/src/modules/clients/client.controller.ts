import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateClientDto, GetClientsDto, UpdateClientDto } from './client.dto';
import { GetClientsModel } from './client.model';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async getClients(@Query() input: GetClientsDto): Promise<GetClientsModel> {
    const [property, direction] = input.sort
      ? input.sort.split(',')
      : ['lastName', 'ASC'];

    const [clients, totalCount] = await this.clientService.getAllClients({
      ...input,
      sort: {
        [property]: direction as 'ASC' | 'DESC',
      },
    });

    return {
      data: clients,
      totalCount,
    };
  }

  @Get(':id')
  public async getClient(@Param('id') id: string) {
    return this.clientService.getClientById(id);
  }

  @Post()
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Patch(':id')
  updateClient(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateClient(id, updateClientDto);
  }

  @Delete(':id')
  deleteClient(@Param('id') id: string) {
    return this.clientService.deleteClient(id);
  }
}