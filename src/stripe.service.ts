import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripService {
  private stripe = new Stripe(process.env.STRIPE_KEY, {
    apiVersion: '2022-11-15',
  });

  async proccessPayment(cost: number, currency: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount: cost,
        currency: currency,
        payment_method_types: ['card'],
      });
    } catch (error) {
      console.error('API key is not valid for stripe');
      return null;
    }
  }
}
