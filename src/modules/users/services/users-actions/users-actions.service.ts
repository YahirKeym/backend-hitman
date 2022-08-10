import { BadRequestException, Injectable } from '@nestjs/common';
import { usersEntity } from '../../entities';

@Injectable()
export class UsersActionsService {
  private usersEntity = usersEntity.UsersEntityInit();

  async assignUserToManager(userToAsign: number, managerToAsignUser: number) {
    try {
      const userToAssign = await this.usersEntity.findOne({
        where: {
          id: userToAsign,
        },
      });
      if (!userToAssign) {
        throw new BadRequestException('User to assign not found');
      }
      if (userToAssign.role === 2 || userToAssign.role === 1) {
        throw new BadRequestException(
          'Not can assign a manager to other manager',
        );
      }
      await this.usersEntity.update(
        {
          assigned: managerToAsignUser,
        },
        {
          where: {
            id: userToAsign,
          },
        },
      );
    } catch (notifyError) {
      console.log('ERROR ASSIGN USER => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
    return { status: 'userAsiggned' };
  }
}
