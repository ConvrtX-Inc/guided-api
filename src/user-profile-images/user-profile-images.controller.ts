import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileImage } from './user-profile-image.entity';
import { UserProfileImagesService } from './user-profile-images.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('User Profile Images')
@Crud({
  model: {
    type: UserProfileImage,
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
  path: 'user-profile-images',
  version: '1',
})
export class UserProfileImagesController implements CrudController<UserProfileImage> {
  constructor(public service: UserProfileImagesService) {}

  get base(): CrudController<UserProfileImage> {
    return this;
  }
}