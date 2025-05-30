import { IsDate, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name?: string;

  @IsDate()
  birthdate?: Date;
}
