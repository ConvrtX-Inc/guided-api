import { Controller, Request, UseGuards, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Transaction } from './transaction.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Transactions')
@Crud({
  model: {
    type: Transaction,
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
  path: 'transactions',
  version: '1',
})
export class TransactionController implements CrudController<Transaction> {
  constructor(public service: TransactionService) {}

  get base(): CrudController<Transaction> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @ApiOperation({ summary: 'Get the transactions of a guide/partners.' })
  @Get('byguide/:user_id')      
  public async getTransactionsByGuide(@Param('user_id') user_id: string) {
    return this.service.getTransactionsByGuide(user_id);
  }
}
