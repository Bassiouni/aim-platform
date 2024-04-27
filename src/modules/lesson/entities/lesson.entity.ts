import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { LevelEntity } from '../../level/entities/level.entity';
import { VisitedLessonEntity } from './visited-lesson.entity';
import { AbstractEntity } from 'src/common/abstract-classes/anstract.entity';

@Entity('lesson')
export class LessonEntity extends AbstractEntity {
  @Column()
  public readonly name: string;

  @Column({ unique: true })
  public readonly contentFile: string;

  @ManyToOne(() => LevelEntity, (level) => level.lessons)
  @JoinColumn({ name: 'level_id' })
  public readonly level: LevelEntity;

  @OneToMany(() => VisitedLessonEntity, (visitedLesson) => visitedLesson.lesson)
  public readonly visitedLessons: VisitedLessonEntity[];
}
