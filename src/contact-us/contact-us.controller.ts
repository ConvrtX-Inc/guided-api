import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController } from '@nestjsx/crud';
import { ContactUs } from './contact-us.entity';
import { ContactUsService } from './contact-us.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Contact Us')
@Crud({
  model: {
    type: ContactUs,
  },
  routes: {
    exclude: ['getManyBase', 'replaceOneBase', 'createManyBase'],
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
  path: 'contact-us',
  version: '1',
})
export class ContactUsController implements CrudController<ContactUs> {
  constructor(public service: ContactUsService) {}

  get base(): CrudController<ContactUs> {
    return this;
  }
}
