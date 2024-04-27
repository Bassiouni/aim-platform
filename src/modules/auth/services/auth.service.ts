import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { hash } from 'bcrypt';
import { TokenTypeEnum } from '../enums/token-type.enum';
import { TokenFormatType } from '../types/token-format.type';
import { UserService } from '../../user/services/user.service';
import { TokenService } from './token.service';
import { CreatedUserDto } from '../../user/dto/created-user.dto';
import { UserType } from '../../user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {}

  public async login(source: string, loginAdmin: LoginDto) {
    const userEntity = await this.userService.findOneByEmail(loginAdmin.email);

    const { id, salt, passwordHash, email, name, isActive } = userEntity;

    const pepper = this.configService.getOrThrow<string>('bcrypt_password');

    const authPassword = await hash(loginAdmin.password + pepper, salt);

    if (authPassword !== passwordHash) {
      throw new BadRequestException('incorrect username or password');
    }

    const { accessToken, refreshToken } = await this.getTokensObject({
      id,
      email,
      name,
      isActive,
    });

    const { exp } = this.jwtService.decode(refreshToken) as {
      exp: number;
      iat: number;
    };

    await this.tokenService.create({
      id: 0,
      user: userEntity,
      source,
      refreshTokenHash: refreshToken,
      expiresAt: new Date(exp * 1000).toISOString(),
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: CreatedUserDto.from(userEntity),
    };
  }

  public async refreshUserToken(user: UserType): Promise<string> {
    return await this.genAccessToken(user);
  }

  private async getTokensObject(user: UserType) {
    const { accessToken, refreshToken } = await this.generateUserTokens(user);

    return { accessToken, refreshToken };
  }

  private async generateUserTokens(user: UserType) {
    const accessToken = await this.genAccessToken(user);
    const refreshToken = await this.genUserRefreshToken(user);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async genAccessToken({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    exp,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    iat,
    ...user
  }: UserType & { iat?: number; exp?: number }): Promise<string> {
    return await this.jwtService.signAsync(
      { user, tokenType: TokenTypeEnum.ACCESS_TOKEN } as TokenFormatType,
      {
        secret: this.configService.getOrThrow<string>('access_token_secret'),
        expiresIn: '15m',
      },
    );
  }

  private async genUserRefreshToken(user: UserType): Promise<string> {
    return await this.jwtService.signAsync(
      {
        user,
        tokenType: TokenTypeEnum.REFRESH_TOKEN,
      } as TokenFormatType,
      {
        secret: this.configService.getOrThrow<string>('refresh_token_secret'),
        expiresIn: '7d',
      },
    );
  }
}
