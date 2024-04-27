import { Module } from '@nestjs/common';
import { GalleryService } from './services/gallery.service';
import { GalleryController } from './controllers/gallery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GalleryEntity } from './entities/gallery.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PermissionManagerModule } from '../permission-manager/permission-manager.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GalleryEntity]),
    PermissionManagerModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
        storage: diskStorage({
          destination: './upload',
          filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const ext = file.originalname.split('.')[1];
            const newFilename = `${name.split(' ').join('_')}_${new Date()}.${ext}`;

            callback(null, newFilename);
          },
        }),
      }),
    }),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
