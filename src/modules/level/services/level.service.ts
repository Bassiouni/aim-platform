import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from '../entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  public constructor(
    @InjectRepository(LevelEntity)
    private readonly levelRepository: Repository<LevelEntity>,
  ) {}

  public async create(createLevelDto: CreateLevelDto) {
    return await this.levelRepository.save(createLevelDto);
  }

  public async findAll() {
    return await this.levelRepository.find();
  }

  public async findOne(id: number) {
    return await this.levelRepository.findOneBy({ id });
  }

  public async update(id: number, updateLevelDto: UpdateLevelDto) {
    return await this.levelRepository.update(id, updateLevelDto);
  }

  public async remove(id: number) {
    return await this.levelRepository.delete(id);
  }
}
