import { Injectable } from '@nestjs/common';
import { AuthorModel, CreateAuthorModel } from './author.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity, AuthorId } from './author.entity';


@Injectable()
export class AuthorRepository {

  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}


  public async getAllAuthors(): Promise<AuthorModel[]> {
    return this.authorRepository.find();
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.save(this.authorRepository.create(author));
  }
  public async getAuthorById(id: string): Promise<AuthorModel | undefined> {
      const author= await this.authorRepository.findOne({
        where: { id: id as AuthorId },
      });
  
      if (!author) {
        return undefined;
      }
  
      return {
        ...author,
      };
    }
}

