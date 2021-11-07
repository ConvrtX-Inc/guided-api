import { Controller, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityAdvertisementService } from './activityAdvertisement.service';
import { ActivityAdvertisement } from './entities/activityAdvertisement.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Advertisement')
@Crud({
  model: {
    type: ActivityAdvertisement,
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
})
@Controller({
  path: 'activity-advertisement',
  version: '1',
})
export class ActivityAdvertisementController implements CrudController<ActivityAdvertisement> {
  constructor(readonly service: ActivityAdvertisementService) {}

  get base(): CrudController<ActivityAdvertisement> {
    return this;
  }
}
