import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsUnique } from 'src/utilities/validators/is-unique/is-unique.validator';
import { UserEntity } from '../entities/user.entity';

export class CreatedUserDto {
  @IsNumber()
  @IsNotEmpty()
  @IsUnique({ tableName: 'user', column: 'id' })
  public readonly id: number;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique(
    { tableName: 'user', column: 'email' },
    { message: 'User already exists with email $value' },
  )
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsBoolean()
  @IsNotEmpty()
  public readonly isActive: boolean;

  private constructor({ id, name, isActive }: CreatedUserDto) {
    Object.assign(this, { id, name, isActive });
  }

  public static from(adminEntity: UserEntity): CreatedUserDto {
    return new CreatedUserDto(adminEntity);
  }
}
