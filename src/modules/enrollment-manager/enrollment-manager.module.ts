import { Module } from '@nestjs/common';
import { EnrollmentManagerService } from './services/enrollment-manager.service';
import { EnrollmentManagerController } from './controllers/enrollment-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrolledCourseEntity } from './entities/enrolled-course.entity';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';
import { LessonModule } from '../lesson/lesson.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrolledCourseEntity]),
    UserModule,
    CourseModule,
    PermissionManagerModule,
    LessonModule,
  ],
  controllers: [EnrollmentManagerController],
  providers: [EnrollmentManagerService],
  exports: [EnrollmentManagerService],
})
export class EnrollmentManagerModule {}
