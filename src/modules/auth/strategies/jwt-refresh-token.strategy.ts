import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { TokenService } from '../services/token.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserType } from '../../user/types/user.type';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token-strategy',
) {
  public constructor(
    readonly configService: ConfigService,
    private readonly adminTokenService: TokenService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.getOrThrow('refresh_token_secret'),
      passReqToCallback: true,
    });
  }

  public async validate(req: Request, payload: UserType): Promise<UserType> {
    const refresh_token = req.get('Authorization').replace('Bearer', '').trim();
    const source = req.headers['user-agent'];

    const adminEntity = await this.userService.findOne(payload.id);

    const { refreshTokenHash, expiresAt } =
      await this.adminTokenService.findOneByTokenAndSource(
        refresh_token,
        adminEntity,
        source,
      );

    if (refreshTokenHash !== refresh_token) {
      throw new BadRequestException('incorrect token');
    }

    if (new Date() > new Date(expiresAt)) {
      throw new ForbiddenException('session expired, please login again');
    }

    return payload;
  }
}
