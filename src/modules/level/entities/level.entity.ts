import { LessonEntity } from '../../lesson/entities/lesson.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CourseEntity } from '../../course/entities/course.entity';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';

@Entity('level')
export class LevelEntity extends AbstractEntity {
  @Column()
  public readonly name: string;

  @ManyToOne(() => CourseEntity, (course) => course.levels)
  public readonly course: CourseEntity;

  @OneToMany(() => LessonEntity, (lesson) => lesson.level, {
    cascade: true,
  })
  public readonly lessons: LessonEntity[];
}
