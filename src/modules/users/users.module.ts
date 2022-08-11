import { Module } from '@nestjs/common';
import { UsersActionsService } from './services/users-actions/users-actions.service';
import { UsersActionsController } from './controllers/users-actions/users-actions.controller';
import { UsersGeneralService } from './services/users-general/users-general.service';
import { UsersGeneralController } from './controllers/users-general/users-general.controller';

@Module({
  providers: [UsersActionsService, UsersGeneralService],
  controllers: [UsersActionsController, UsersGeneralController],
})
export class UsersModule {}
