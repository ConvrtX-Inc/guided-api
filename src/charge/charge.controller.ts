import {
  Body,
  Request,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import CreateChargeDto from './dtos/create-charge.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import CreatePaymentDto from './dtos/create-payment.dto';
import * as dateMath from 'date-arithmetic';
import CreatePaymentIntentDto from './dtos/create-payment-intent.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stripe')
@Controller({
  path: 'charge',
  version: '1',
})
export default class ChargeController {
  constructor(private readonly stripeService: StripeService) {}
  private pricePerDay = 120;

  @Post()
  async createCharge(@Request() request, @Body() charge: CreateChargeDto) {
    await this.stripeService.charge(
      charge.amount,
      charge.payment_method_id,
      //request.user.stripe_customer_id,
      charge.customer_id,
    );
  }

  @Post('computePaymentPerDay')
  async createPayment(@Request() request, @Body() amount: CreatePaymentDto) {
    const dateEnd = new Date(amount.end_date);
    const dateStart = new Date(amount.start_date);
    const days = dateMath.diff(dateStart, dateEnd, 'day', true);
    const totalPayment = days * this.pricePerDay;
    return totalPayment;
  }

  @Post('create-payment-intent')
  async createPaymentIntentId(
    @Request() request,
    @Body() paymentDetails: CreatePaymentIntentDto,
  ) {
    return await this.stripeService.createPaymentIntent(
      paymentDetails.amount,
      request,
    );
  }
}
