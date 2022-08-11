import { Module } from '@nestjs/common';
import { HitsGeneralService } from './services/hits-general/hits-general.service';
import { HitsGeneralController } from './controllers/hits-general/hits-general.controller';
import { UsersGeneralService } from '../users/services/users-general/users-general.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UsersGeneralService, HitsGeneralService],
  controllers: [HitsGeneralController],
})
export class HitsModule {}
