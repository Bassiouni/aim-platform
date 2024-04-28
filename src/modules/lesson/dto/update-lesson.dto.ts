import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsOptional()
  @IsNumber()
  @IsNotEmptyObject()
  @IsNotEmpty()
  public levelId: number;
}
