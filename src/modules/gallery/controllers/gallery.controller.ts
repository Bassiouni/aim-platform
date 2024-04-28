import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Redirect,
} from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { GalleryEntity } from '../entities/gallery.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '../../../utilities/decorators/user.decorator';
import { diskStorage } from 'multer';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: GalleryEntity,
  })
  @UseInterceptors(
    FileInterceptor('image', {
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
  )
  @Redirect('/profile')
  public async create(
    @UploadedFile() file: Express.Multer.File,
    @User('id') userId: number,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    await this.galleryService.create(
      { photoPath: `/${file.filename}` },
      userId,
    );
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: GalleryEntity,
  })
  public async findAll() {
    return await this.galleryService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: GalleryEntity,
  })
  public async findOne(@Param('id') id: string) {
    return await this.galleryService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: GalleryEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    return await this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: GalleryEntity,
  })
  public async remove(@Param('id') id: string) {
    return await this.galleryService.remove(+id);
  }
}
