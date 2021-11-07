import { Controller, Request, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { ActivityOutfitterService } from './activityOutfitter.service';
import { ActivityOutfitter } from './entities/activityOutfitter.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Activity Outfitter')
@Crud({
  model: {
    type: ActivityOutfitter,
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
  },
})
@Controller({
  path: 'activity-outfitter',
  version: '1',
})
export class ActivityOutfitterController implements CrudController<ActivityOutfitter> {
  constructor(readonly service: ActivityOutfitterService) {}

  get base(): CrudController<ActivityOutfitter> {
    return this;
  }
}
