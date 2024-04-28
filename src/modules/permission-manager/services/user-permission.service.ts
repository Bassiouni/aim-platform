import { Injectable } from '@nestjs/common';
import { UserPermissionEntity } from '../entities/user-permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../user/services/user.service';
import { PermissionService } from './permission.service';

@Injectable()
export class UserPermissionService {
  public constructor(
    @InjectRepository(UserPermissionEntity)
    private readonly userPermissionRepository: Repository<UserPermissionEntity>,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService,
  ) {}

  public async create(userId: number, permissionId: number) {
    const user = await this.userService.findOne(userId);
    const permission = await this.permissionService.findOne(permissionId);

    return await this.userPermissionRepository.save({ user, permission });
  }

  public async findAll() {
    return await this.userPermissionRepository.find();
  }
}
