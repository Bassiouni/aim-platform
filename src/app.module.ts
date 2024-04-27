import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { IsUniqueConstraint } from './utilities/validators/is-unique/is-unique.constraint';
import { AuthModule } from './modules/auth/auth.module';
import { PermissionManagerModule } from './modules/permission-manager/permission-manager.module';
import { UserModule } from './modules/user/user.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { LevelModule } from './modules/level/level.module';
import { CourseModule } from './modules/course/course.module';
import { EnrollmentManagerModule } from './modules/enrollment-manager/enrollment-manager.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config],
    }),
    JwtModule.register({ global: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    AuthModule,
    PermissionManagerModule,
    UserModule,
    GalleryModule,
    LessonModule,
    LevelModule,
    CourseModule,
    EnrollmentManagerModule,
  ],
  controllers: [AppController],
  providers: [IsUniqueConstraint],
})
export class AppModule {}
