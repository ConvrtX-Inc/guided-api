import { Controller, Request, UseGuards, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { Transaction } from './transaction.entity';
import { TransactionUserAndStatusDto } from './dtos/transaction-user-status.dto';
import { TransactionGuideAndStatusDto } from './dtos/transaction-guide-status.dto';

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
  constructor(public service: TransactionService) { }

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

  @ApiOperation({ summary: 'Get the transactions by user_id and status' })
  @Get('byuser/transaction/:user_id/:status')
  public async getTransactionsByUserAndStatus(@Param('user_id') user_id: string, @Param('status') status: string) {
    return this.service.getTransactionsByUserAndStatus(user_id, status);
  }

  @ApiOperation({ summary: 'Get the transactions by tour_guide_id and status' })
  @Get('byguide/transaction/:tour_guide_id/:status')
  public async getTransactionsByGuideAndStatus(@Param('tour_guide_id') tour_guide_id: string, @Param('status') status: string) {
    return this.service.getTransactionsByGuideAndStatus(tour_guide_id, status);
  }

  @ApiOperation({ summary: 'Update the status id to refunded' })
  @Patch('updateToRefunded/:transaction_id')
  public async updateToRefunded(@Param('transaction_id') transaction_id: string) {
    return this.service.updateToRefunded(transaction_id);
  }
}