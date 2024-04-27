import {
  Controller,
  Post,
  Body,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtRefreshTokenGuard } from '../guards/jwt-refresh-token-guard.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { User } from 'src/utilities/decorators/user.decorator';
import { UserType } from 'src/modules/user/types/user.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(
    @Headers('user-agent') source: string,
    @Body() loginUser: LoginDto,
  ) {
    const { accessToken, refreshToken, user } = await this.authService.login(
      source,
      loginUser,
    );

    return {
      user: user,
      accessToken,
      refreshToken,
    };
  }

  @Put('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  public async refresh(@User() user: UserType) {
    const accessToken = await this.authService.refreshUserToken(user);

    return {
      accessToken,
    };
  }
}
