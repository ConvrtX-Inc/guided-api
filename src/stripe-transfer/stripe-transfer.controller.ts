import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import CreateTransferDto from './dtos/create-transfer.dto';
import ConfirmTransferDto from './dtos/confirm-transfer.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stripe')
@Controller({
  path: 'transfer',
  version: '1',
})
export default class StripeTransferController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  @ApiOperation({
    description: 'This is to transfer money to bank account',
  })
  async transferToAccount(@Request() request, @Body() dto: CreateTransferDto) {
    return this.stripeService.transferAccount(dto);
  }
  @Post('confirm-transfer')
  @ApiOperation({
    description: 'This is to confirm the transfer',
  })
  async confirmTransfer(@Request() request, @Body() dto: ConfirmTransferDto) {
    return this.stripeService.confirmTransfer(dto);
  }
}
