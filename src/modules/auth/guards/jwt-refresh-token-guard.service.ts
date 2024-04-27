import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { TokenFormatType } from '../types/token-format.type';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard(
  'jwt-refresh-token-strategy',
) {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    if (!canActivate) {
      return false;
    }

    const {
      user: { isActive },
      tokenType,
    } = (super.getRequest(context) as Request).user as TokenFormatType;

    // req.user here doesn't refer to a real request user object; it's just a placeholder for the underlying access token object
    if (tokenType !== TokenTypeEnum.REFRESH_TOKEN) {
      return false;
    }

    return isActive;
  }
}
