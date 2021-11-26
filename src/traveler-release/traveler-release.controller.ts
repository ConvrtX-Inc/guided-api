import { Controller, UseGuards, Request } from '@nestjs/common';
import { TravelerReleaseService } from './traveler-release.service';
import { CreateTravelerReleaseDto } from './dto/create-traveler-release.dto';
import { UpdateTravelerReleaseDto } from './dto/update-traveler-release.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { TravelerRelease } from './entities/traveler-release.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Traveler Release and Waiver Form')
@Crud({
  model: {
    type: TravelerRelease,
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
  path: 'traveler-release',
  version: '1',
})
export class TravelerReleaseController
  implements CrudController<TravelerRelease>
{
  constructor(public service: TravelerReleaseService) {}
  get base(): CrudController<TravelerRelease> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }
}
