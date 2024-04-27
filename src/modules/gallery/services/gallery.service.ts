import { Injectable } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GalleryEntity } from '../entities/gallery.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GalleryService {
  public constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}

  public async create(createGalleryDto: CreateGalleryDto) {
    return await this.galleryRepository.save(createGalleryDto);
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
