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
import { LessonService } from '../services/lesson.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { LessonEntity } from '../entities/lesson.entity';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { User } from 'src/utilities/decorators/user.decorator';

@Controller('lesson')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: LessonEntity,
  })
  public async create(@Body() createLessonDto: CreateLessonDto) {
    return await this.lessonService.create(createLessonDto);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: LessonEntity,
  })
  public async findAll() {
    return await this.lessonService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: LessonEntity,
  })
  public async findOne(@Param('id') id: string, @User('id') userId: number) {
    return await this.lessonService.findOne(+id, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: LessonEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return await this.lessonService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: LessonEntity,
  })
  public async remove(@Param('id') id: string) {
    return await this.lessonService.remove(+id);
  }
}
