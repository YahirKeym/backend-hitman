import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/middleware/guards/roles.guard';
import { UsersGeneralService } from '../../services/users-general/users-general.service';

@Controller('users-general')
@UseGuards(RolesGuard)
export class UsersGeneralController {
  constructor(private readonly UsersGeneralService: UsersGeneralService) {}

  @Post('/login')
  login(@Body() payload) {
    return this.UsersGeneralService.loginUser(payload.email, payload.password);
  }

  @Get('/get-user')
  getUser(@Headers() headers) {
    return this.UsersGeneralService.getUserForToken(headers.x_access_token);
  }

  @Get('/get-all-hitmans/:id')
  @SetMetadata('roles', ['theboss', 'manager'])
  getAllHitmans(@Param() params) {
    return this.UsersGeneralService.getAllHitmans(params.id);
  }

  @Get('/get-all-users')
  @SetMetadata('roles', ['theboss'])
  getAllUsers() {
    return this.UsersGeneralService.getAllUsers();
  }
}
