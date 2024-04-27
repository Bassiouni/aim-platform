import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnrollmentManagerDto {
  @IsNumber()
  @IsNotEmpty()
  public readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  public readonly courseId: number;
}
