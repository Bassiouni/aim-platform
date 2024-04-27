import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('user-token')
export class TokenEntity extends AbstractEntity {
  @Column({ nullable: true, length: 500 })
  public readonly refreshTokenHash: string;

  @Column()
  public readonly source: string;

  @Column()
  public readonly expiresAt: string;

  @ManyToOne(() => UserEntity, (user) => user.adminTokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public readonly user: UserEntity;
}
