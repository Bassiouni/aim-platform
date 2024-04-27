import { Injectable } from '@nestjs/common';
import { CreateEnrollmentManagerDto } from '../dto/create-enrollment-manager.dto';
import { UpdateEnrollmentManagerDto } from '../dto/update-enrollment-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrolledCourseEntity } from '../entities/enrolled-course.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { CourseService } from '../../course/services/course.service';

@Injectable()
export class EnrollmentManagerService {
  public constructor(
    @InjectRepository(EnrolledCourseEntity)
    private readonly enrolledCourseRepository: Repository<EnrolledCourseEntity>,
    private readonly userService: UserService,
    private readonly courseService: CourseService,
  ) {}

  public async enrollUserToCourse({
    userId,
    courseId,
  }: CreateEnrollmentManagerDto) {
    const user = await this.userService.findOne(userId);
    const course = await this.courseService.findOne(courseId);

    return await this.enrolledCourseRepository.save({
      course,
      user,
    });
  }

  public async findAll() {
    return await this.enrolledCourseRepository.find({
      relations: {
        user: true,
        course: true,
      },
      select: ['id', 'user', 'course'],
    });
  }

  public async findOne(id: number) {
    return await this.enrolledCourseRepository.findOne({
      where: { id },
      relations: { user: true, course: true },
      select: ['id', 'course', 'user'],
    });
  }

  public async update(
    id: number,
    { userId, courseId }: UpdateEnrollmentManagerDto,
  ) {
    const user = await this.userService.findOne(userId);
    const course = await this.courseService.findOne(courseId);

    return await this.enrolledCourseRepository.update(id, { user, course });
  }

  public async remove(id: number) {
    return await this.enrolledCourseRepository.delete(id);
  }
}
