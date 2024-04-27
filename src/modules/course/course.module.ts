import { Module } from '@nestjs/common';
import { CourseService } from './services/course.service';
import { CourseController } from './controllers/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]), PermissionManagerModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
