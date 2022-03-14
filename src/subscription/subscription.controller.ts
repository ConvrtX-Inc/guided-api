import {
  Body,
  Request,
  Controller,
  Post,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import StripeService from '../stripe/stripe.service';
import CreateSubscriptionDto from './dtos/create-subscription.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Stripe')
@Controller({
  path: 'subscription',
  version: '1',
})
export default class SubscriptionController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly usersService: UsersService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Post()
  async createSubscription(
    @Request() request,
    @Body() dto: CreateSubscriptionDto,
  ) {
    try {
      const user = await this.usersService.findOneEntity({
        where: {
          id: request.user.id,
        },
      });
      if (!user.stripe_customer_id) {
        const customer = await this.stripeService.createCustomer(
          user.first_name + ' ' + user.last_name,
          user.email,
        );
        user.stripe_customer_id = customer.id;
        await user.save();
      }

      const card = await this.connection.query(
        `SELECT * FROM card WHERE user_id = '${user.id}' AND is_default = false ORDER BY created_date DESC LIMIT 1`,
      );

      if (card.length == 0) {
        return {
          status: HttpStatus.BAD_REQUEST,
          response: {
            data: {
              details: 'Please add default card for user first.',
            },
          },
        };
      }

      const paymentId = await this.stripeService.createPaymentMethod(
        'card',
        card[0].card_no,
        card[0].expiry_date,
        card[0].cvc,
      );
      await this.stripeService.attachPaymentMethod(
        paymentId.id,
        user.stripe_customer_id,
      );
      await this.stripeService.customerUpdate(
        paymentId.id,
        user.stripe_customer_id,
      );
      const subscription = await this.stripeService.subscription(
        dto.price_stripe_id,
        user.stripe_customer_id,
      );
      const subscriptionInvoice = subscription.latest_invoice;
      const subscriptionInvoiceId =
        typeof subscriptionInvoice !== 'string' ? subscriptionInvoice.id : null;
      const response = subscriptionInvoice
        ? await this.stripeService.payInvoice(subscriptionInvoiceId)
        : null;
      if (!response) {
        return {
          status: HttpStatus.BAD_REQUEST,
          response: {
            data: {
              details: 'Something went wrong invoice is not found',
            },
          },
        };
      }

      return {
        status: HttpStatus.OK,
        response: {
          data: {
            details: response,
          },
        },
      };
    } catch (e) {
      return {
        status: HttpStatus.BAD_REQUEST,
        response: {
          data: {
            details: 'Something went wrong:' + e,
          },
        },
      };
    }
  }
}
