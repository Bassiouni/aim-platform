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
import { EnrollmentManagerService } from '../services/enrollment-manager.service';
import { CreateEnrollmentManagerDto } from '../dto/create-enrollment-manager.dto';
import { UpdateEnrollmentManagerDto } from '../dto/update-enrollment-manager.dto';
import { JwtAccessTokenGuard } from '../../auth/guards/jwt-access-token-guard.service';
import { PermissionGuard } from '../../permission-manager/guards/permission.guard';
import { RequirePermissions } from '../../../utilities/decorators/require-permissions.decorator';
import { ActionTypeEnum } from '../../permission-manager/enums/action-type.enum';
import { EnrolledCourseEntity } from '../entities/enrolled-course.entity';

@Controller('enrollment-manager')
export class EnrollmentManagerController {
  constructor(
    private readonly enrollmentManagerService: EnrollmentManagerService,
  ) {}

  @Post()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.CREATE,
    entity: EnrolledCourseEntity,
  })
  public async enrollUserToCourse(
    @Body() createEnrollmentManagerDto: CreateEnrollmentManagerDto,
  ) {
    return await this.enrollmentManagerService.enrollUserToCourse(
      createEnrollmentManagerDto,
    );
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: EnrolledCourseEntity,
  })
  public async findAll() {
    return await this.enrollmentManagerService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.READ,
    entity: EnrolledCourseEntity,
  })
  public async findOne(@Param('id') id: string) {
    return await this.enrollmentManagerService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.UPDATE,
    entity: EnrolledCourseEntity,
  })
  public async update(
    @Param('id') id: string,
    @Body() updateEnrollmentManagerDto: UpdateEnrollmentManagerDto,
  ) {
    return await this.enrollmentManagerService.update(
      +id,
      updateEnrollmentManagerDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenGuard, PermissionGuard)
  @RequirePermissions({
    action: ActionTypeEnum.DELETE,
    entity: EnrolledCourseEntity,
  })
  public async remove(@Param('id') id: string) {
    return await this.enrollmentManagerService.remove(+id);
  }
}
