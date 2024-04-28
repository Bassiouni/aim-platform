import { ExecutionContext, Injectable } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/utilities/decorators/require-permissions.decorator';
import { PermissionType } from '../types/permission.type';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { PermissionService } from '../services/permission.service';
import { AuthGuard } from '@nestjs/passport';
import { TokenFormatType } from 'src/modules/auth/types/token-format.type';
import { TokenTypeEnum } from 'src/modules/auth/enums/token-type.enum';

@Injectable()
export class PermissionGuard extends AuthGuard('jwt-access-token-strategy') {
  public constructor(
    protected readonly reflector: Reflector,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly permissionService: PermissionService,
  ) {
    super();
  }

  public override async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false;
    }

    const request = super.getRequest(context) as Request;
    const { user, tokenType } = request.user as TokenFormatType;

    if (tokenType !== TokenTypeEnum.ACCESS_TOKEN) {
      return false;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<
      PermissionType<any>[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    return requiredPermissions.some(
      async ({ action, entity }): Promise<boolean> => {
        const { tableName: entityName } = this.dataSource.getMetadata(entity);

        return await this.permissionService.permissionWithGivenUserExists(
          action,
          entityName,
          user,
        );
      },
    );
  }
}
