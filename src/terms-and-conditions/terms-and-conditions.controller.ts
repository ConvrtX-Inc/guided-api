import {
  Controller,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { TermsAndConditionService } from './terms-and-conditions.service';
import { TermsAndCondition } from './terms-and-condition.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Terms And Condition')
@Crud({
  model: {
    type: TermsAndCondition,
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
  path: 'terms-and-conditions',
  version: '1'
})
export class TermsAndConditionsController implements CrudController<TermsAndCondition> {
  constructor(public service: TermsAndConditionService) { }

  get base(): CrudController<TermsAndCondition> {
    return this;
  }

  @Get('/:type')
  @ApiOperation({ summary: 'Get Terms and Conditions by Type' })
  getTermsByType(@Param('type') type: string) {
    return this.service.getTermsByType(type);
  }

}
