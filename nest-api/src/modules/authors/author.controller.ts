import { Body, Controller, Get, Post, Param, Delete, Patch } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get(':id')
    public async getAuthor(@Param('id') id: string) {
      return this.authorService.getAuthorById(id);
    }

  @Delete(':id')
    public async deleteAuthor(@Param('id') id: string){
      return this.authorService.deleteAuthor(id);
    }

  @Patch(':id')
    public async UpdateAuthor(@Param('id') id:string, @Body() updateAuthorDto: UpdateAuthorDto){ //is there a missing type here?
      return this.authorService.updateAuthor(id, updateAuthorDto);
    }
    
}
