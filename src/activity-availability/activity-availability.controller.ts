import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ActivityAvailabilityService } from './activity-availability.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAvailability } from './activity-availability.entity';
import { SlotAvailabilityDto } from './dtos/availability-slot.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Availabilities')
@Crud({
  model: {
    type: ActivityAvailability,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
  params: {
    id: {
      type: 'uuid',
      primary: true,
      field: 'id',
    },
  },
})
@Controller({
  path: 'activity-availabilities',
  version: '1',
})
export class ActivityAvailabilityController
  implements CrudController<ActivityAvailability>
{
  constructor(public service: ActivityAvailabilityService) {}

  get base(): CrudController<ActivityAvailability> {
    return this;
  }

  @Override()
  async createOneBase(@Request() request) {
    return this.service.saveEntity(request);
  }
  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @ApiOperation({ summary: 'Create Slot Availability' })
  @Post('create-slot-availability')
  @HttpCode(HttpStatus.OK)
  public async createSlotAvailability(@Body() dto: SlotAvailabilityDto) {
    return this.service.createSlotAvailability(dto);
  }
  @ApiOperation({ summary: 'Update Slot Availability' })
  @Post('update-slot-availability/:id')
  @HttpCode(HttpStatus.OK)
  public async updateSlotAvailability(
    @Body() dto: SlotAvailabilityDto,
    @Param('id') id: string,
  ) {
    return this.service.updateSlotAvailability(dto, id);
  }
}
