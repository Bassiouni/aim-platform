import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonEntity } from '../entities/lesson.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { VisitedLessonEntity } from '../entities/visited-lesson.entity';
import { LevelService } from '../../level/services/level.service';

@Injectable()
export class LessonService {
  public constructor(
    @InjectRepository(LessonEntity)
    private readonly lessonRepository: Repository<LessonEntity>,
    private readonly userService: UserService,
    @InjectRepository(VisitedLessonEntity)
    private readonly visitedLessonRepository: Repository<VisitedLessonEntity>,
    private readonly levelService: LevelService,
  ) {}

  public async create(createLessonDto: CreateLessonDto) {
    return await this.lessonRepository.save(createLessonDto);
  }

  public async findAll() {
    return await this.lessonRepository.find();
  }

  public async findOne(id: number, userId: number) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    const user = await this.userService.findOne(userId);
    await this.visitedLessonRepository.save({ lesson, user });
    return lesson;
  }

  public async update(id: number, updateLessonDto: UpdateLessonDto) {
    if (
      updateLessonDto.levelId !== undefined &&
      updateLessonDto.levelId !== null
    ) {
      await this.lessonRepository.save({
        id,
        level: await this.levelService.findOne(updateLessonDto.levelId),
      });
    }
    delete updateLessonDto.levelId;
    return await this.lessonRepository.save({ id, updateLessonDto });
  }

  public async remove(id: number) {
    return await this.lessonRepository.delete(id);
  }
}
