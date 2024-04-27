import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PermissionEntity } from './permission.entity';

@Entity('user-permission')
export class UserPermissionEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity, (user) => user.userPermissions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  public readonly user: UserEntity;

  @ManyToOne(() => PermissionEntity, (permission) => permission.userPermissions)
  @JoinColumn({ name: 'permission_id', referencedColumnName: 'id' })
  public readonly permission: PermissionEntity;
}
