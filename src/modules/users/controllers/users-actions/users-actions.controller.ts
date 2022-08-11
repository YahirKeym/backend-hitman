import { UsersActionsService } from './../../services/users-actions/users-actions.service';
import {
  Controller,
  Patch,
  Body,
  UseGuards,
  SetMetadata,
  Post,
} from '@nestjs/common';
import { RolesGuard } from 'src/middleware/guards/roles.guard';

@Controller('users-actions')
@SetMetadata('roles', ['theboss'])
@UseGuards(RolesGuard)
export class UsersActionsController {
  constructor(private readonly UsersActionsService: UsersActionsService) {}

  @Post('/register')
  register(@Body() payload) {
    return this.UsersActionsService.registerUser(payload);
  }

  @Patch('/assign-manager')
  @SetMetadata('roles', ['theboss'])
  assignManager(@Body() payload) {
    return this.UsersActionsService.assignUserToManager(
      payload.userToAssign,
      payload.managerToAssignUser,
      payload.statusUser,
    );
  }
}
