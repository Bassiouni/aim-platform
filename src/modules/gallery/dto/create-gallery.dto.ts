import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyObject()
  public readonly photoPath: string;
}
