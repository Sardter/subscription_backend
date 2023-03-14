import { Module } from '@nestjs/common';
import { AddressController } from '../controllers/address.controller';
import { AddressModule } from '../modules/address.module';
import { AddressService } from '../servises/address.service';

@Module({
  imports: [AddressModule],
  providers: [AddressService],
  controllers: [AddressController]
})
export class UserHttpModule {}