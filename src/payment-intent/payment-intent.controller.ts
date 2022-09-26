import {
  Controller,
  Body,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { PaymentIntent } from './payment-intent.entity';
import { PaymentIntentService } from './payment-intent.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Payment Intent')
@Crud({
  model: {
    type: PaymentIntent,
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
  path: 'payment-intent',
  version: '1',
})
export class PaymentIntentController implements CrudController<PaymentIntent> {
  constructor(public service: PaymentIntentService) {}

  get base(): CrudController<PaymentIntent> {
    return this;
  }
}
