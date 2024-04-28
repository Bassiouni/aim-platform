import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { PermissionGuard } from './guards/permission.guard';
import { PermissionService } from './services/permission.service';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { UserPermissionService } from './services/user-permission.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, UserPermissionEntity]),
    forwardRef(() => UserModule),
  ],
  providers: [PermissionGuard, PermissionService, UserPermissionService],
  exports: [PermissionService, UserPermissionService],
})
export class PermissionManagerModule {}
