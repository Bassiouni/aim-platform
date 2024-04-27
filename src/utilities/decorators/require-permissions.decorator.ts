import { SetMetadata } from '@nestjs/common';
import { PermissionType } from 'src/modules/permission-manager/types/permission.type';

export const PERMISSION_KEY = 'permissions';
export const RequirePermissions = <T>(...permissions: PermissionType<T>[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
