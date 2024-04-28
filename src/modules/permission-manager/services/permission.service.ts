import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { ActionTypeEnum } from '../enums/action-type.enum';
import { UserType } from 'src/modules/user/types/user.type';
import { PermissionType } from '../types/permission.type';

@Injectable()
export class PermissionService {
  public constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  public async findAll() {
    return await this.permissionRepository.find();
  }

  public async findOne(id: number) {
    return await this.permissionRepository.findOneBy({ id });
  }
  public async create(permission: PermissionType<any>) {
    return await this.permissionRepository.save(permission);
  }

  // TODO: Make Relation with user
  public async permissionWithGivenUserExists(
    action: ActionTypeEnum,
    entity: string,
    user: UserType,
  ) {
    const permissionEntity = await this.permissionRepository.exists({
      where: {
        action,
        entity,
        userPermissions: {
          user: {
            id: user.id,
          },
        },
      },
      relations: {
        userPermissions: {
          user: true,
        },
      },
    });

    if (!permissionEntity) {
      throw new NotFoundException("permission wasn't fount");
    }

    return permissionEntity;
  }
}
