import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AddressModule } from './addresses/http-modules/address.module';
import { CountryModule } from './addresses/http-modules/country.module';
import { StateModule } from './addresses/http-modules/state.module';
import { OrderModule } from './orders/order.module';
import { UserModule } from './users/user.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    AddressModule,
    CountryModule,
    StateModule,
    OrderModule,
    UserModule,
    SubscriptionModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
