import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService, private usersService :UsersService) {
    this.stripe = new Stripe(configService.get('stripe.secretKey'), {
      apiVersion: '2020-08-27',
    });
  }

  async createCustomer(name: string, email: string) {
    return await this.stripe.customers.create({
      name,
      email,
    });
  }

  async charge(amount: number, paymentMethodId: string, customerId: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: this.configService.get('stripe.currency'),
      confirm: true,
    });
  }

  async subscription(price_stripe_id: string, stripe_customer_id: string) {
    return await this.stripe.subscriptions.create({
      customer: stripe_customer_id,
      items: [{ price: price_stripe_id }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
  }

  async attachPaymentMethod(token_id: string, stripe_customer_id: string) {
    return await this.stripe.paymentMethods.attach(token_id, {
      customer: stripe_customer_id,
    });
  }

  async customerUpdate(token_id: string, stripe_customer_id: string) {
    return await this.stripe.customers.update(stripe_customer_id, {
      invoice_settings: {
        default_payment_method: token_id,
      },
    });
  }

  async payInvoice(invoice_id: string) {
    return await this.stripe.invoices.pay(invoice_id);
  }

  async createPaymentMethod(card_type, card_no, expiry_date, cvc) {
    const date = new Date(expiry_date);
    const exp_month = date.getMonth();
    const exp_year = date.getFullYear();
    return await this.stripe.paymentMethods.create({
      type: card_type,
      card: {
        number: card_no,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
  }

  async createPaymentIntent(amount: number,request) {
    const user = await this.usersService.findOneEntity({
      where: {
        id: request.user.id,
      },
    });
    
    if(!user.stripe_customer_id) {
      const name =  user.full_name == '' ?  user.first_name +' '+  user.last_name :  user.full_name;
      const customer = await this.createCustomer(
        name,user.email
      );
      user.stripe_customer_id = customer.id;
      await user.save();
    }
    return await this.stripe.paymentIntents.create({
      amount,
      customer: user.stripe_customer_id,
      currency: this.configService.get('stripe.currency')
    });
  }

}
