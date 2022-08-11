import { UsersGeneralService } from 'src/modules/users/services/users-general/users-general.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly UsersGeneralService: UsersGeneralService,
  ) {}

  async matchRoles(roles, token) {
    const user = await this.UsersGeneralService.getUserForToken(token);
    const userValidate = await this.UsersGeneralService.validateUserForRole(
      user.id,
      roles,
    );
    return userValidate;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = request.headers.x_access_token;
    return await this.matchRoles(roles, token);
  }
}
