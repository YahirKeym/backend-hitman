import { Module } from '@nestjs/common';
import { UsersActionsService } from './services/users-actions/users-actions.service';
import { UsersActionsController } from './controllers/users-actions/users-actions.controller';

@Module({
  providers: [UsersActionsService],
  controllers: [UsersActionsController],
})
export class UsersModule {}
