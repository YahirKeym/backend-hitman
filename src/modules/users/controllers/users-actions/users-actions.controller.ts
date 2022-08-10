import { UsersActionsService } from './../../services/users-actions/users-actions.service';
import { Controller, Patch, Body } from '@nestjs/common';

@Controller('users-actions')
export class UsersActionsController {
  constructor(private readonly UsersActionsService: UsersActionsService) {}

  @Patch('/assign-manager')
  assignManager(@Body() payload) {
    return this.UsersActionsService.assignUserToManager(
      payload.userToAssign,
      payload.managerToAssignUser,
    );
  }
}
