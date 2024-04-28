import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtRefreshTokenGuard } from '../guards/jwt-refresh-token-guard.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { User } from 'src/utilities/decorators/user.decorator';
import { UserType } from 'src/modules/user/types/user.type';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Headers('user-agent') source: string,
    @Body() loginUser: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      source,
      loginUser,
    );
    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });

    return {
      user,
    };
  }

  @Get('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  public async refresh(
    @User() user: UserType,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.refreshUserToken(user);

    res.cookie('access-token', accessToken, { httpOnly: true });
    return {
      user,
    };
  }
}
