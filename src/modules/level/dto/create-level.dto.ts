import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreateLevelDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyObject()
  public readonly name: string;
}
