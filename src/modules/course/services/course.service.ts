import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from '../entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  public constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  public async create(createCourseDto: CreateCourseDto) {
    return await this.courseRepository.save(createCourseDto);
  }

  public async findAll() {
    return await this.courseRepository.find();
  }

  public async findOne(id: number) {
    return await this.courseRepository.findOneBy({ id });
  }

  public async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseRepository.update(id, updateCourseDto);
  }

  public async remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
