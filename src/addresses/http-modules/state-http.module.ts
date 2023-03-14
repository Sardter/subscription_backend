import { Module } from '@nestjs/common';
import { StateController } from '../controllers/state.controller';
import { StateModule } from '../modules/state.module';
import { StateService } from '../servises/state.service';

@Module({
  imports: [StateModule],
  providers: [StateService],
  controllers: [StateController],
})
export class UserHttpModule {}
