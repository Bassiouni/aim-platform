import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentManagerDto } from './create-enrollment-manager.dto';

export class UpdateEnrollmentManagerDto extends PartialType(
  CreateEnrollmentManagerDto,
) {}
