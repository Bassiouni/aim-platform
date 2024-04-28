import { Module } from '@nestjs/common';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LevelEntity]),
    PermissionManagerModule,
    CourseModule,
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
