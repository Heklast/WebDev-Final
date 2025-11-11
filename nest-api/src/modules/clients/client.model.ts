import { ClientId } from './entities/client.entity';

export type ClientModel = {
  id: ClientId;
  firstName: string;
  lastName: string;
  email?: string;
  pictureUrl?: string;
};

export type CreateClientModel = {
  firstName: string;
  lastName: string;
  email?: string;
  pictureUrl?: string;
};

export type UpdateClientModel = {
  firstName?: string;
  lastName?: string;
  email?: string;
  pictureUrl?: string;
};

export type FilterClientsModel = {
  limit?: number;
  offset?: number;
  sort?: {
    [key: string]: 'ASC' | 'DESC';
  };
};

export type GetClientsModel = {
  data: ClientModel[];
  totalCount: number;
};