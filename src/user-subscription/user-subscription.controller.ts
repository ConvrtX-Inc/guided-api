import { Controller, Request, UseGuards } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { UserSubscription } from './user-subscription.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Subscription')
@Crud({
  model: {
    type: UserSubscription,
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
  path: 'user-subscription',
  version: '1',
})
export class UserSubscriptionController
  implements CrudController<UserSubscription>
{
  constructor(public service: UserSubscriptionService) {}

  get base(): CrudController<UserSubscription> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.delete(request.params.id);
  }
}
