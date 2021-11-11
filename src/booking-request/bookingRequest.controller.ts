import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { BookingRequestService } from './bookingRequest.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override } from '@nestjsx/crud';
import { BookingRequest } from './bookingRequest.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Booking Request')
@Crud({
  model: {
    type: BookingRequest,
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
  path: 'booking-requests',
  version: '1',
})
export class BookingRequestController
  implements CrudController<BookingRequest>
{
  constructor(public service: BookingRequestService) {}

  get base(): CrudController<BookingRequest> {
    return this;
  }

  @Override()
  async deleteOne(@Request() request) {
    return this.service.softDelete(request.params.id);
  }

  @ApiOperation({ summary: 'Retrieve all bookings of a user' })    
  @Get(':user_id')    
  async getProjectNotes(@Param('user_id') id: string) {
    return this.service.userBookings(id); 
  }

  @ApiOperation({ summary: 'Post multiple booking request' })    
  @Post('/multiple')    
  async multipleBookingRequest(@Body() multipleRequest: BookingRequest[]) {
    console.log(multipleRequest);
    return this.service.saveEntity(multipleRequest); 
  }
}
