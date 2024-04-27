import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyObject()
  public readonly name: string;
}
