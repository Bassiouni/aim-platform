import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenFormatType } from 'src/modules/auth/types/token-format.type';
import { UserType } from '../../modules/user/types/user.type';

export const User = createParamDecorator(
  (data: keyof UserType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { user } = request.user as TokenFormatType;
    return data ? user?.[data] : user;
  },
);
