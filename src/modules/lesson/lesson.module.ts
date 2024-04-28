import { Module } from '@nestjs/common';
import { LessonService } from './services/lesson.service';
import { LessonController } from './controllers/lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonEntity } from './entities/lesson.entity';
import { VisitedLessonEntity } from './entities/visited-lesson.entity';
import { UserModule } from '../user/user.module';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';
import { LevelModule } from '../level/level.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LessonEntity, VisitedLessonEntity]),
    UserModule,
    PermissionManagerModule,
    LevelModule,
  ],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
