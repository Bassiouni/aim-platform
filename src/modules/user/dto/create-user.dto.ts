import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  public readonly password: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  public readonly isActive: boolean;
}
