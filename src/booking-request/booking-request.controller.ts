import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { BookingRequestService } from './booking-request.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Crud, CrudController, Override, ParsedBody } from '@nestjsx/crud';
import { BookingRequest } from './booking-request.entity';
import {FindBookingDto} from "./booking.dto";

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
    join: {
      status: {
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
  createOne(@ParsedBody() req: BookingRequest) {
    return this.service.saveOne(req);
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

  @ApiOperation({ summary: 'Approve booking request' })
  @Post('approve-request/:id')
  @HttpCode(HttpStatus.OK)
  async approveRequest(@Param('id') id: string) {
    return this.service.approveRequest(id);
  }

  @ApiOperation({ summary: 'Reject booking request' })
  @Post('reject-request/:id')
  @HttpCode(HttpStatus.OK)
  async rejectRequest(@Param('id') id: string) {
    return this.service.rejectRequest(id);
  }

  @ApiOperation({ summary: 'find booking request' })
  @Post('reject-request')
  @HttpCode(HttpStatus.OK)
  async findBookingsRequest(dto: FindBookingDto) {
    return this.service.findBookingsRequest(dto);
  }

  @ApiOperation({ summary: 'Filter booking request by status' })
  @ApiParam({
    name: 'status',
    allowEmptyValue: false,
    examples: {
      a: {
        summary: 'All',
        description: 'Retrieves all booking requests',
        value: 'all',
      },
      b: {
        summary: 'Pending',
        description: 'Retrieves pending booking requests',
        value: 'pending',
      },
      c: {
        summary: 'Completed',
        description: 'Retrieves completed booking requests',
        value: 'completed',
      },
      d: {
        summary: 'Rejected',
        description: 'Retrieves rejected booking requests',
        value: 'rejected',
      },
    },
  })
  @Get('filter/:user_id/:status')
  @HttpCode(HttpStatus.OK)
  async filterRequest(
    @Param('user_id') user_id: string,
    @Param('status') status: string,
  ) {
    return this.service.getFilteredRequests(user_id, status);
  }
}
