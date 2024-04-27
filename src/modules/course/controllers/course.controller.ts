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
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { CourseEntity } from '../entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: CourseEntity,
  })
  public async create(@Body() createCourseDto: CreateCourseDto) {
    return await this.courseService.create(createCourseDto);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: CourseEntity,
  })
  public async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: CourseEntity,
  })
  public async findOne(@Param('id') id: string) {
    return await this.courseService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: CourseEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return await this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: CourseEntity,
  })
  public async remove(@Param('id') id: string) {
    return await this.courseService.remove(+id);
  }
}
