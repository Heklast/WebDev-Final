import { Injectable } from '@nestjs/common';
import { ClientModel, CreateClientModel, FilterClientsModel, UpdateClientModel } from './client.model';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity, ClientId } from './entities/client.entity';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    const queryBuilder = this.clientRepository.createQueryBuilder('client');

    if (input?.sort) {
      const [property, direction] = Object.entries(input.sort)[0];
      queryBuilder.orderBy(`client.${property}`, direction as 'ASC' | 'DESC');
    }

    if (input?.limit) {
      queryBuilder.take(input.limit);
    }

    if (input?.offset) {
      queryBuilder.skip(input.offset);
    }

    return queryBuilder.getManyAndCount();
  }

  public async getAllClientsWithSales(): Promise<ClientEntity[]> {
    return this.clientRepository.find({
      relations: ['sales'],
      order: {
        lastName: 'ASC',
        firstName: 'ASC',
      },
    });
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return undefined;
    }

    return {
      ...client,
    };
  }

  public async getClientByIdWithSales(id: string): Promise<ClientEntity | undefined> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
      relations: ['sales', 'sales.book', 'sales.book.author'],
    });

    if (!client) {
      return undefined;
    }

    return client;
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!oldClient) {
      return undefined;
    }

    await this.clientRepository.update(id, client);
    
    const updatedClient = await this.getClientById(id);
    return updatedClient;
  }

  public async countClientPurchases(id: string): Promise<number> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
      relations: ['sales'],
    });

    return client?.sales?.length || 0;
  }
}