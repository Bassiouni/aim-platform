import { Column, Entity, OneToMany } from 'typeorm';
import { ActionTypeEnum } from '../enums/action-type.enum';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { UserPermissionEntity } from './user-permission.entity';

@Entity('permission')
export class PermissionEntity extends AbstractEntity {
  @Column()
  public readonly entity: string;

  @Column({ enum: ActionTypeEnum, enumName: 'action_type' })
  public readonly action: ActionTypeEnum;

  @OneToMany(() => UserPermissionEntity, (up) => up.permission)
  public readonly userPermissions: UserPermissionEntity[];
}
