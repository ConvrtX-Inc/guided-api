import {
  Controller,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { UsersTermsAndConditionsService } from './users-terms-and-conditions.service';
import { UsersTermsAndCondition } from './users-terms-and-condition.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users Terms And Condition')
@Crud({
  model: {
    type: UsersTermsAndCondition,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 10,
    alwaysPaginate: true,
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
  path: 'users-terms-and-conditions',
  version: '1'
})
export class UsersTermsAndConditionsController implements CrudController<UsersTermsAndCondition> {
  constructor(public service: UsersTermsAndConditionsService) {}

  get base(): CrudController<UsersTermsAndCondition> {
    return this;
  }
}
