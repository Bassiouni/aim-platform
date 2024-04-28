import { PartialType } from '@nestjs/mapped-types';
import { CreateLevelDto } from './create-level.dto';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateLevelDto extends PartialType(CreateLevelDto) {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @IsNotEmptyObject()
  public courseId?: number;
}
