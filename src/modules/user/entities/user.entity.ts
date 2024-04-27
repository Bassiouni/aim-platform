import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { Exclude } from 'class-transformer';
import { UserPermissionEntity } from '../../permission-manager/entities/user-permission.entity';
import { TokenEntity } from '../../auth/entities/tokenEntity';
import { GalleryEntity } from '../../gallery/entities/gallery.entity';
import { EnrolledCourseEntity } from '../../enrollment-manager/entities/enrolled-course.entity';
import { VisitedLessonEntity } from '../../lesson/entities/visited-lesson.entity';

@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  public readonly name: string;

  @Column({ unique: true })
  public readonly email: string;

  @Column()
  public readonly passwordHash: string;

  @Column()
  @Exclude()
  public readonly salt: string;

  @Column({
    default: false,
  })
  public readonly isActive: boolean;

  @OneToMany(
    () => UserPermissionEntity,
    (userPermissionEntity: UserPermissionEntity) => userPermissionEntity.user,
  )
  public readonly userPermissions: UserPermissionEntity[];

  @OneToMany(
    () => TokenEntity,
    (adminTokenEntity: TokenEntity) => adminTokenEntity.user,
  )
  public readonly adminTokens: TokenEntity[];

  @OneToMany(() => GalleryEntity, (galleryEntity) => galleryEntity.user)
  public readonly gallery: GalleryEntity[];

  @OneToMany(
    () => EnrolledCourseEntity,
    (enrolledCourseEntity) => enrolledCourseEntity.user,
  )
  public readonly enrolledCourses: EnrolledCourseEntity[];

  @OneToMany(() => VisitedLessonEntity, (visitedLesson) => visitedLesson.user)
  public readonly visitedLessons: VisitedLessonEntity[];
}
