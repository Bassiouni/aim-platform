import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IsUniqueConstraintInput } from './is-unique.validator';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  public constructor(private readonly entityManager: EntityManager) {}

  public async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { tableName, column }: IsUniqueConstraintInput =
      validationArguments.constraints[0];

    const exists = await this.entityManager
      .getRepository(tableName)
      .createQueryBuilder(tableName)
      .where({ [column]: value })
      .getExists();

    return !exists;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'the record already exist';
  }
}
