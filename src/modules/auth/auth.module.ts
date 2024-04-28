import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/tokenEntity';
import { JwtAccessTokenGuard } from './guards/jwt-access-token-guard.service';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token-guard.service';
import { TokenService } from './services/token.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    PassportModule.registerAsync({
      useFactory: () => ({
        defaultStrategy: 'jwt-access-token-strategy',
        session: false,
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
