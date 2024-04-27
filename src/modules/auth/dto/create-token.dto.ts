import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';

export class CreateTokenDto {
  @IsNumber()
  @IsOptional()
  public readonly id?: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  public readonly user: UserEntity;

  @IsString()
  @IsNotEmpty()
  public readonly source: string;

  @IsString()
  @IsNotEmpty()
  public readonly refreshTokenHash: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  public readonly expiresAt: string;
}
