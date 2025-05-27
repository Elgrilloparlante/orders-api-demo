export class UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  birthdate?: Date;
  status?: 'active' | 'inactive' | 'banned';
}
