import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsUUID(4)
  authorId:string;
}

export class UpdateAuthorDto{
  @IsString()
  @IsOptional()
  firstName:string;

  @IsString()
  @IsOptional()
  lastName:string;
}








