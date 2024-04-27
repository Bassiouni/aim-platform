import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { UserEntity } from '../entities/user.entity';
import { RequirePermissions } from 'src/utilities/decorators/require-permissions.decorator';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  // @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  // @RequirePermissions({
  //   action: ActionTypeEnum.CREATE,
  //   entity: UserEntity,
  // })
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: UserEntity,
  })
  public async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get(':id/gallery')
  public async findOneGallery(@Param('id') id: string) {
    return this.userService.findOneGallery(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: UserEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: UserEntity,
  })
  public async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
