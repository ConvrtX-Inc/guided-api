import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { TransactionPayment } from './transaction-payment.entity';
import { TransactionPaymentService } from './transaction-payment.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Transaction Payment')
@Crud({
  model: {
    type: TransactionPayment,
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
  path: 'transaction-payment',
  version: '1',
})
export class TransactionPaymentController
  implements CrudController<TransactionPayment>
{
  constructor(public service: TransactionPaymentService) {}

  get base(): CrudController<TransactionPayment> {
    return this;
  }
}
