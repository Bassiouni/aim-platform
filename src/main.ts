import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { UserService } from './modules/user/services/user.service';
import { PermissionService } from './modules/permission-manager/services/permission.service';
import { ActionTypeEnum } from './modules/permission-manager/enums/action-type.enum';
import { UserPermissionService } from './modules/permission-manager/services/user-permission.service';
import { CourseService } from './modules/course/services/course.service';
import { EnrollmentManagerService } from './modules/enrollment-manager/services/enrollment-manager.service';
import { LessonService } from './modules/lesson/services/lesson.service';
import { LevelService } from './modules/level/services/level.service';

async function populateDatabase(app: NestExpressApplication) {
  const userService = app.get(UserService);
  if ((await userService.findAll()).length == 0) {
    await userService.create({
      name: 'Nadeem',
      email: 'nadeem@gmail.com',
      isActive: true,
      password: '@Nadeem01;',
    });
  }

  const permissionService = app.get(PermissionService);
  if ((await permissionService.findAll()).length == 0) {
    const entities = [
      'course',
      'enrolled-course',
      'gallery',
      'lesson',
      'level',
      'permission',
      'user',
      'user-permission',
      'user-token',
      'visited-lesson',
    ];
    const actions: ActionTypeEnum[] = [
      ActionTypeEnum.CREATE,
      ActionTypeEnum.READ,
      ActionTypeEnum.UPDATE,
      ActionTypeEnum.DELETE,
    ];

    entities.forEach((entity) =>
      actions.forEach(
        async (action) => await permissionService.create({ entity, action }),
      ),
    );
  }

  const userPermissionService = app.get(UserPermissionService);
  if ((await userPermissionService.findAll()).length == 0) {
    const permissions = await permissionService.findAll();
    const { id: adminId } =
      await userService.findOneByEmail('nadeem@gmail.com');

    permissions.forEach(({ id }) => userPermissionService.create(adminId, id));
  }

  const courseService = app.get(CourseService);
  if ((await courseService.findAll()).length == 0) {
    await courseService.create({
      name: 'Graphic Design Course',
    });
  }

  const enrollmentManagerService = app.get(EnrollmentManagerService);
  if ((await enrollmentManagerService.findAll()).length == 0) {
    await enrollmentManagerService.enrollUserToCourse({
      userId: 1,
      courseId: 1,
    });
  }

  const levelService = app.get(LevelService);
  if ((await levelService.findAll()).length == 0) {
    const level = await levelService.create({
      name: 'Level 1',
    });

    await levelService.update(level.id, {
      courseId: 1,
    });
  }

  const lessonService = app.get(LessonService);
  if ((await lessonService.findAll()).length == 0) {
    const lesson = await lessonService.create({
      name: 'Lesson 1',
      contentFile: '<h1>Content lesson 1</h1>',
    });

    await lessonService.update(lesson.id, {
      levelId: 1,
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", 'https://cdn.tailwindcss.com'],
        },
      },
    }),
  );
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'upload'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);

  console.log({ env: configService.get('env') });
  await populateDatabase(app);

  await app.listen(configService.getOrThrow('port'), '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
