import { Module } from '@nestjs/common';
import { LevelService } from './services/level.service';
import { LevelController } from './controllers/level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([LevelEntity]), PermissionManagerModule],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
