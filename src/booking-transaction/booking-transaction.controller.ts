import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { BookingTransaction } from './booking-transaction.entity';
import { BookingTransactionService } from './booking-transaction.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Booking Transaction')
@Crud({
  model: {
    type: BookingTransaction,
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
  path: 'booking-transaction',
  version: '1',
})
export class BookingTransactionController
  implements CrudController<BookingTransaction>
{
  constructor(public service: BookingTransactionService) {}

  get base(): CrudController<BookingTransaction> {
    return this;
  }
}
