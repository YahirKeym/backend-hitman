import { Module } from '@nestjs/common';
import { HitsGeneralService } from './services/hits-general/hits-general.service';
import { HitsGeneralController } from './controllers/hits-general/hits-general.controller';

@Module({
  providers: [HitsGeneralService],
  controllers: [HitsGeneralController],
})
export class HitsModule {}
