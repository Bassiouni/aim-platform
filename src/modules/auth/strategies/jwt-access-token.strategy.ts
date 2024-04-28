import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserType } from 'src/modules/user/types/user.type';
import { Request } from 'express';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token-strategy',
) {
  public constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAccessTokenStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('access_token_secret'),
    });
  }

  public validate(payload: UserType): UserType {
    return payload;
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (
      req.cookies &&
      'access-token' in req.cookies &&
      req.cookies['access-token'].length > 0
    )
      return req.cookies['access-token'];
    return null;
  }
}
