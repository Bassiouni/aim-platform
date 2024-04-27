import { IsNotEmpty, IsNotEmptyObject, IsString } from 'class-validator';
import { IsUnique } from 'src/utilities/validators/is-unique/is-unique.validator';

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyObject()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsUnique({ column: 'contentFile', tableName: 'lesson' })
  public readonly contentFile: string;
}
