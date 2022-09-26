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
import { BankAccount } from './bank-account.entity';
import { BankAccountService } from './bank-account.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Bank Account')
@Crud({
  model: {
    type: BankAccount,
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
  path: 'bank-account',
  version: '1',
})
export class BankAccountController implements CrudController<BankAccount> {
  constructor(public service: BankAccountService) {}

  get base(): CrudController<BankAccount> {
    return this;
  }
}
