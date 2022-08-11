import { Body, Controller, Post } from '@nestjs/common';
import { UsersGeneralService } from '../../services/users-general/users-general.service';

@Controller('users-general')
export class UsersGeneralController {
  constructor(private readonly UsersGeneralService: UsersGeneralService) {}

  @Post('/login')
  login(@Body() payload) {
    return this.UsersGeneralService.loginUser(payload.email, payload.password);
  }
}
