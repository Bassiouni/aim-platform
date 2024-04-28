import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from '../entities/level.entity';
import { Repository } from 'typeorm';
import { CourseService } from '../../course/services/course.service';

@Injectable()
export class LevelService {
  public constructor(
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
    private readonly courseService: CourseService,
  ) {}

  public async create(createLevelDto: CreateLevelDto) {
    return await this.levelRepository.save(createLevelDto);
  }

  public async findAll() {
    return await this.levelRepository.find();
  }

  public async findOne(id: number) {
    return await this.levelRepository.findOneBy({ id });
  }

  public async update(id: number, updateLevelDto: UpdateLevelDto) {
    if (
      updateLevelDto.courseId !== undefined &&
      updateLevelDto.courseId !== null
    ) {
      const course = await this.courseService.findOne(updateLevelDto.courseId);
      await this.levelRepository.save({
        id,
        course,
      });
    }
    delete updateLevelDto.courseId;
    return await this.levelRepository.save({ id, ...updateLevelDto });
  }

  public async remove(id: number) {
    return await this.levelRepository.delete(id);
  }
}
