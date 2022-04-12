import { Controller, Param, Patch, Request, UseGuards } from '@nestjs/common'
import { Crud, CrudController, Override } from '@nestjsx/crud'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersCrudService } from './users-crud.service'

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
  constructor(public service: UsersCrudService, public userService: UsersService) { }

  get base(): CrudController<User> {
    return this
  }

  @Override('getOneBase')
  async getOneAndDoStuff(@Request() req) {
    return this.service.getOneBase(req.params.id)
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id)
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
    return this.userService.update(id, req.body)
  }

  @Patch('/update-phone-no')
  @ApiOperation({ summary: 'Update one User\'s phone no' })
  @ApiBody({
    schema: {
      properties: {
        'id': { type: 'string' },
        'phone_no': { type: 'number' }
      }
    }
  })
  async updatePhoneNo(@Request() req) {
    return this.userService.updatePhoneNo(req.body.id, req.body.phone_no)
  }

  @Patch('/update-about')
  @ApiOperation({ summary: 'Update one User\'s about text' })
  @ApiBody({
    schema: {
      properties: {
        'id': { type: 'string' },
        'about': { type: 'string' }
      }
    }
  })
  async updateAbout(@Request() req) {
    return this.userService.updateAbout(req.body.id, req.body.about)
  }

  @Patch('/update-photo')
  @ApiOperation({ summary: 'Update one User\'s photo' })
  @ApiBody({
    schema: {
      properties: {
        'id': { type: 'string' },
        'file_id': { type: 'string' }
      }
    }
  })
  async updatePhoto(@Request() req) {
    return this.userService.updatePhoto(req.body.id, req.body.file_id)
  }

  @Patch('/update-guide')
  @ApiOperation({ summary: 'Update one User to Guide' })
  @ApiBody({
    schema: {
      properties: {
        'id': { type: 'string' },
        'is_guide': { type: 'boolean' }
      }
    }
  })
  async updateAsGuide(@Request() req) {
    return this.userService.updateAsGuide(req.body.id, req.body.is_guide)
  }

  @Patch('/set-availability')
  @ApiOperation({ summary: 'Update one User\'s about online status' })
  @ApiBody({
    schema: {
      properties: {
        'id': { type: 'string' },
        'is_online': { type: 'boolean' }
      }
    }
  })
  async updateAvailability(@Request() req) {
    return this.userService.updateAvailability(req.body.id, req.body.is_online)
  }
}
