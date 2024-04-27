import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionGuard } from './guards/permission.guard';
import { PermissionService } from './services/permission.service';
import { UserPermissionEntity } from './entities/user-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, UserPermissionEntity])],
  providers: [PermissionGuard, PermissionService],
  exports: [PermissionService],
})
export class PermissionManagerModule {}
