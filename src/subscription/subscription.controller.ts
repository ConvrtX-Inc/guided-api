import {
  Body,
  Request,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import CreateSubscriptionDto from './dtos/create-subscription.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stripe')
@Controller({
  path: 'subscription',
  version: '1',
})
export default class SubscriptionController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async createSubscription(@Request() request, @Body() dto: CreateSubscriptionDto) {
    await this.stripeService.subscription(
      dto.price_stripe_id,
      request.user.stripe_customer_id,
    );
  }
}
