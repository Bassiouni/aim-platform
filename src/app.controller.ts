import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Redirect,
  Render,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './modules/user/dto/create-user.dto';
import { LoginDto } from './modules/auth/dto/login.dto';
import type { Response } from 'express';
import { UserService } from './modules/user/services/user.service';
import { AuthService } from './modules/auth/services/auth.service';
import { User } from './utilities/decorators/user.decorator';
import { UserType } from './modules/user/types/user.type';
import { JwtAccessTokenGuard } from './modules/auth/guards/jwt-access-token-guard.service';
import { join } from 'node:path';
import { createReadStream } from 'node:fs';
import { EnrollmentManagerService } from './modules/enrollment-manager/services/enrollment-manager.service';

@Controller()
export class AppController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly enrollmentManager: EnrollmentManagerService,
  ) {}

  @Get()
  @Render('index')
  public index() {}

  @Get('home')
  @Render('home')
  public async home() {
    return {
      users: await this.userService.findAll(),
    };
  }

  @Get('signup')
  @Render('signup')
  public signup() {
    return {
      method: true,
    };
  }

  @Post('signup')
  @Redirect('/')
  @Render('signup')
  public async postSignup(@Body() createUserDto: CreateUserDto) {
    let user = null;
    try {
      user = (await this.userService.create(createUserDto)) as any;
    } catch (e) {
      if (user.error && user.statusCode == 400) {
        return {
          method: false,
          message: user.message,
        };
      }
    }
  }

  @Get('login')
  @Render('login')
  public login() {}

  @Post('login')
  public async postLogin(
    @Headers('user-agent') source: string,
    @Body() loginUser: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.login(
      source,
      loginUser,
    );
    res.cookie('access-token', accessToken, { httpOnly: true });
    res.cookie('refresh-token', refreshToken, { httpOnly: true });
    res.redirect('/profile');
  }

  @Get('profile')
  @Render('profile')
  @UseGuards(JwtAccessTokenGuard)
  public async profile(@User() user: UserType) {
    const userWithGallery = await this.userService.findOneGallery(user.id);
    return {
      user,
      gallery: userWithGallery.gallery,
    };
  }

  @Get('logout')
  @Redirect('/')
  @UseGuards(JwtAccessTokenGuard)
  public logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access-token', { expires: new Date() });
    res.clearCookie('refresh-token', { expires: new Date() });
  }

  @Get('upload/:file')
  @Header('Content-Type', 'image/*')
  public upload(@Param('file') filepath: string) {
    const file = createReadStream(join(__dirname, '..', 'upload', filepath));
    return new StreamableFile(file);
  }

  @Get(':id/gallery')
  @Render('user-gallery')
  public async userGallery(@Param('id') id: string) {
    const userWithGallery = await this.userService.findOneGallery(+id);
    return {
      user: {
        name: userWithGallery.name,
        email: userWithGallery.email,
      },
      gallery: userWithGallery.gallery,
    };
  }

  @Get('courses')
  @UseGuards(JwtAccessTokenGuard)
  @Render('courses')
  public async courses(@User() user: UserType) {
    const course = await this.enrollmentManager.findUserEnrolledCourses(
      user.id,
    );
    return {
      course,
    };
  }

  @Get('courses/:id')
  @UseGuards(JwtAccessTokenGuard)
  @Render('course-levels')
  public async enrolledLevels(@Param('id') id: string, @User() user: UserType) {
    return await this.enrollmentManager.findUserEnrolledCourseLevels(
      user.id,
      +id,
    );
  }

  @Get('courses/:course_id/level/:level_id')
  @UseGuards(JwtAccessTokenGuard)
  @Render('level-lessons')
  public async levelLessons(
    @Param('course_id') courseId: string,
    @Param('level_id') levelId: string,
    @User() user: UserType,
  ) {
    return await this.enrollmentManager.findUserEnrolledCourseLevelLessons(
      user.id,
      +courseId,
      +levelId,
    );
  }

  @Get('courses/:course_id/level/:level_id/lesson/:lesson_id')
  @UseGuards(JwtAccessTokenGuard)
  @Render('lesson-content')
  public async levelLessonContent(
    @Param('course_id') courseId: string,
    @Param('level_id') levelId: string,
    @Param('lesson_id') lessonId: string,
    @User() user: UserType,
  ) {
    return await this.enrollmentManager.findUserEnrolledCourseLevelLessonContent(
      user.id,
      +courseId,
      +levelId,
      +lessonId,
    );
  }
}
