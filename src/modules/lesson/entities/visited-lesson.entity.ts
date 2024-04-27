import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { LessonEntity } from './lesson.entity';

@Entity('visited-lesson')
export class VisitedLessonEntity extends AbstractEntity {
  @ManyToOne(() => UserEntity, (user) => user.visitedLessons)
  @JoinColumn({ name: 'user_id' })
  public readonly user: UserEntity;

  @ManyToOne(() => LessonEntity, (lesson) => lesson.visitedLessons)
  @JoinColumn({ name: 'lesson_id' })
  public readonly lesson: LessonEntity;
}
