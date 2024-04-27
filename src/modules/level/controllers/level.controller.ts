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
import { LevelService } from '../services/level.service';
import { CreateLevelDto } from '../dto/create-level.dto';
import { UpdateLevelDto } from '../dto/update-level.dto';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { LevelEntity } from '../entities/level.entity';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: LevelEntity,
  })
  public async create(@Body() createLevelDto: CreateLevelDto) {
    return await this.levelService.create(createLevelDto);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: LevelEntity,
  })
  public async findAll() {
    return await this.levelService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: LevelEntity,
  })
  public async findOne(@Param('id') id: string) {
    return await this.levelService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: LevelEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateLevelDto: UpdateLevelDto,
  ) {
    return await this.levelService.update(+id, updateLevelDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: LevelEntity,
  })
  public async remove(@Param('id') id: string) {
    return await this.levelService.remove(+id);
  }
}
