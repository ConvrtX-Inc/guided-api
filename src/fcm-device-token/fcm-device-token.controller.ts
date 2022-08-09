import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { FcmDeviceToken } from './fcm-device-token.entity';
import { FcmDeviceTokenService } from './fcm-device-token.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('FCM Device Token')
@Crud({
  model: {
    type: FcmDeviceToken,
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
  path: 'fcm-device-token',
  version: '1',
})
export class FcmDeviceTokenController
  implements CrudController<FcmDeviceToken>
{
  constructor(public service: FcmDeviceTokenService) {}

  get base(): CrudController<FcmDeviceToken> {
    return this;
  }
}
