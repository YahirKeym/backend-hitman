import { BadRequestException, Injectable } from '@nestjs/common';
import { usersEntity } from '../../entities';

@Injectable()
export class UsersActionsService {
  private usersEntity = usersEntity.UsersEntityInit();

  async assignUserToManager(
    userToAsign: number,
    managerToAsignUser: number,
    statusUser: number,
  ) {
    console.log('VALUES', userToAsign, managerToAsignUser, statusUser);
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
          active: statusUser,
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

  async registerUser(payloadUser) {
    try {
      const newUser = await this.usersEntity.create(payloadUser);
      return newUser;
    } catch (notifyError) {
      console.log('ERROR REGISTER USER => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }
}
