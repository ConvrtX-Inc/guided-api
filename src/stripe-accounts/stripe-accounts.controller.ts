import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import CreateStripeAccountDto from './dtos/create-stripe-account.dto';
import AcceptStripeAccountDto from './dtos/accept-stripe-account.dto';
import ConnectBankAccountDto from './dtos/connect-bank-account.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stripe')
@Controller({
  path: 'account',
  version: '1',
})
export default class StripeAccountsController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-stripe-account')
  @ApiOperation({
    description: 'This is create account first to enable bank transfer',
  })
  async createStripeAccount(
    @Request() request,
    @Body() dto: CreateStripeAccountDto,
  ) {
    return this.stripeService.createStripeAccount(dto);
  }
  @Post('accept-account-terms-condition')
  async acceptTermsAndCondition(
    @Request() request,
    @Body() dto: AcceptStripeAccountDto,
  ) {
    return this.stripeService.acceptTermsAndCondition(dto.account_id);
  }
  @Post('on-board-account')
  @ApiOperation({
    description:
      'This is to onboard the account so that the user can transfer money to account',
  })
  async onBoardAccountLink(
    @Request() request,
    @Body() dto: AcceptStripeAccountDto,
  ) {
    return this.stripeService.onBoardAccountLink(dto.account_id);
  }

  @ApiOperation({
    description:
      'This is to add external bank account for connect Please see https://jsfiddle.net/ywain/L2cefvtp/ for the external_account',
  })
  @Post('connect-bank-to-account')
  async connectBankToAccount(
    @Request() request,
    @Body() dto: ConnectBankAccountDto,
  ) {
    return this.stripeService.connectBankToAccount(dto);
  }
}
