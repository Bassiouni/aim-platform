import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from '../entities/gallery.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class GalleryService {
  public constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(createGalleryDto: CreateGalleryDto, userId: number) {
    const user = await this.userService.findOne(userId);
    return await this.galleryRepository.save({
      user,
      photoPath: createGalleryDto.photoPath,
    });
  }

  public async findAll() {
    return await this.galleryRepository.find();
  }

  public async findOne(id: number) {
    return await this.galleryRepository.findOneBy({ id });
  }

  public async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return await this.galleryRepository.update(id, updateGalleryDto);
  }

  public async remove(id: number) {
    return await this.galleryRepository.delete(id);
  }
}
