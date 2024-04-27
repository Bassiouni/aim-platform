import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly password: string;
}
