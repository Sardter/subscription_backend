import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from './users/user.entity';
import { Subscription } from 'rxjs';
import { Order } from './orders/order.entity';
import { Address } from './addresses/entities/address.entity';
import { Country } from './addresses/entities/country.entity';
import { State } from './addresses/entities/state.entity';
import { UsersService } from './users/user.service';
import { SubscriptionService } from './subscription/subscription.service';
import { OrderService } from './orders/order.service';
import { AddressService } from './addresses/servises/address.service';
import { CountryService } from './addresses/servises/country.service';
import { StateService } from './addresses/servises/state.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'beije_backend',
      synchronize: true,
      //entities: [User, Subscription, Order, Address, Country, State],
      autoLoadEntities: true,
      
    }),
    TypeOrmModule.forFeature([
      User,
      Subscription,
      Order,
      Address,
      Country,
      State,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
