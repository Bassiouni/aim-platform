import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('gallery')
export class GalleryEntity extends AbstractEntity {
  @Column({ unique: true })
  public readonly photoPath: string;

  @ManyToOne(() => UserEntity, (user) => user.gallery)
  public readonly user: UserEntity;
}
