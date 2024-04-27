import { ActionTypeEnum } from '../enums/action-type.enum';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';

type GenericEntity<T> = T extends AbstractEntity ? T : unknown;

export type PermissionType<T> = {
  action: ActionTypeEnum;
  entity: GenericEntity<T>;
};
