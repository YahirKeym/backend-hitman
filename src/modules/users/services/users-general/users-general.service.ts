import { Injectable, BadRequestException } from '@nestjs/common';
import { rolesEntity } from 'src/database/entities';
import { v4 as uuidv4 } from 'uuid';
import { usersEntity } from '../../entities';

@Injectable()
export class UsersGeneralService {
  private usersEntity = usersEntity.UsersEntityInit();

  private rolesEntity = rolesEntity.RolesEntityInit();

  async loginUser(email: string, password: string) {
    try {
      const user = await this.usersEntity.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (user.password !== password) {
        throw new BadRequestException('Data incorrect');
      }
      const newToken = uuidv4();
      await this.usersEntity.update(
        {
          token: newToken,
        },
        {
          where: {
            id: user.id,
          },
        },
      );
      return { ...user, token: newToken };
    } catch (notifyError) {
      console.log('ERROR LOGIN USER => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }

  async getUserForToken(token: string) {
    try {
      const user = await this.usersEntity.findOne({
        where: {
          token,
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      return user;
    } catch (notifyError) {
      console.log('ERROR GET USER FOR TOKEN => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }

  async validateUserForRole(userId: number, roles: [string]) {
    let response = false;
    try {
      this.rolesEntity.hasMany(this.usersEntity, { foreignKey: 'role' });
      this.usersEntity.belongsTo(this.rolesEntity, { foreignKey: 'role' });
      const user = await this.rolesEntity.findOne({
        include: {
          model: this.usersEntity,
          where: {
            id: userId,
          },
        },
      });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (roles.find((role) => user.name_role === role)) {
        response = true;
      }
    } catch (notifyError) {
      console.log('ERROR VALIDATE USER => ', notifyError);
    }
    return response;
  }
}
