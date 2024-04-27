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
} from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { GalleryEntity } from '../entities/gallery.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: GalleryEntity,
  })
  @UseInterceptors(FileInterceptor('image'))
  public async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return await this.galleryService.create({ photoPath: `/${file.filename}` });
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
