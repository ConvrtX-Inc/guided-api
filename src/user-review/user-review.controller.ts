import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { UserReviewCrudService } from './user-review-crud.service';
import { UserReview } from './user-review.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Reviews')
@Crud({
  model: {
    type: UserReview,
  },
  routes: {
    exclude: ['replaceOneBase', 'createManyBase'],
  },
  query: {
    maxLimit: 50,
    alwaysPaginate: false,
    join: {
      status: {
        eager: false,
      },
      photo: {
        eager: false,
      },
      user_type: {
        eager: true,
      },
    },
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
  path: 'user-reviews',
  version: '1',
})
export class UserReviewController implements CrudController<UserReview> {
  constructor(public service: UserReviewCrudService) {}

  get base(): CrudController<UserReview> {
    return this;
  }
}
