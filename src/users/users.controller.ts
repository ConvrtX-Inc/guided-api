import { Controller, Param, Patch, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
// @Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'))
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Crud({
  model: {
    type: User,
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
  path: 'users',
  version: '1',
})
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) { }

  get base(): CrudController<User> {
    return this;
  }
  @Override('getOneBase')
  async getOneAndDoStuff(@Request() req) {
    return this.service.getOneBase(req.params.id);
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @Patch('/newpassword/:id')
  @ApiOperation({ summary: 'Update one User\'s password' })
  @ApiBody({
    schema: {
      properties: {
        'password': { type: 'string' }
      }
    }
  })
  async updatePassword(@Param('id') id: string, @Request() req) {
    req.body.id = id;
    return this.service.update(id, req.body);
  }
}
