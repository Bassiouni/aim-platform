import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { CourseEntity } from '../../course/entities/course.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('enrolled-course')
export class EnrolledCourseEntity extends AbstractEntity {
  @ManyToOne(() => CourseEntity, (course) => course.enrolledCourses)
  @JoinColumn({ name: 'course_id' })
  public readonly course: CourseEntity;

  @ManyToOne(() => UserEntity, (user) => user.enrolledCourses)
  @JoinColumn({ name: 'user_id' })
  public readonly user: UserEntity;
}
