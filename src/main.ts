import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
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

  await app.listen(configService.getOrThrow('port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
