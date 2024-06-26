import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { LevelEntity } from '../../level/entities/level.entity';
import { EnrolledCourseEntity } from '../../enrollment-manager/entities/enrolled-course.entity';

@Entity('course')
export class CourseEntity extends AbstractEntity {
  @Column()
  public readonly name: string;

  @OneToMany(() => LevelEntity, (level) => level.course, {
    cascade: true,
  })
  public readonly levels: LevelEntity[];

  @OneToMany(
    () => EnrolledCourseEntity,
    (enrolledCourse) => enrolledCourse.course,
    {
      cascade: true,
    },
  )
  public readonly enrolledCourses: EnrolledCourseEntity[];
}
