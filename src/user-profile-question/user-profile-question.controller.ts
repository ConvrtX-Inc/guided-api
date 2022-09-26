import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  HttpStatus,
  Param,
  Request,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';

import { UserProfileQuestion } from './user-profile-question.entity';
import { UserProfileQuestionService } from './user-profile-question.service';
import { UserProfileQuestionDto } from './dtos/user-profile-question.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Profile Question')
@Crud({
  model: {
    type: UserProfileQuestion,
  },
  routes: {
    exclude: [],
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
  path: 'user-profile-question',
  version: '1',
})
export class UserProfileQuestionController
  implements CrudController<UserProfileQuestion>
{
  constructor(public service: UserProfileQuestionService) {}

  get base(): CrudController<UserProfileQuestion> {
    return this;
  }

  @ApiOperation({ summary: 'Create one Guide user' })
  @Post('/become-a-guide/:user_id')
  @HttpCode(HttpStatus.OK)
  async createOneGuide(@Body() userProfileQuestionDto: UserProfileQuestionDto) {
    return this.service.createOneGuide(userProfileQuestionDto);
  }
}
