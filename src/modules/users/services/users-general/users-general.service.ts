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

  async getAllHitmans(userId: number) {
    try {
      const managerData = await this.usersEntity.findOne({
        where: {
          id: userId,
        },
      });
      const users = await this.usersEntity.findAll({
        where: {
          role: 3,
          assigned: userId,
        },
      });
      const newUsersData = [];
      for await (const user of users) {
        newUsersData.push({
          name: user.name,
          email: user.email,
          role: user.role,
          active: user.active,
          assigned_name: managerData.name,
          assign: user.assigned,
          id: user.id,
        });
      }
      return newUsersData;
    } catch (notifyError) {
      console.log('ERROR GET ALL HITMANS => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }

  async getAllUsers() {
    try {
      const users = await this.usersEntity.findAll({
        where: {
          role: [2, 3],
        },
      });
      const dataManagers = [];
      const newUsersData = [];
      for await (const user of users) {
        const getDataManager = dataManagers.find((dataManager) => {
          if (dataManager.id === user.assigned) {
            return dataManager;
          } else {
            return null;
          }
        });
        if (getDataManager) {
          newUsersData.push({
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
            assign_name: getDataManager.name,
            assign: user.assigned,
            id: user.id,
          });
        } else {
          const userAssign = await this.usersEntity.findOne({
            where: {
              id: user.assigned,
            },
          });
          if (userAssign) {
            dataManagers.push(userAssign);
            newUsersData.push({
              name: user.name,
              email: user.email,
              role: user.role,
              active: user.active,
              assign_name: userAssign.name,
              assign: user.assigned,
              id: user.id,
            });
          }
        }
      }
      return newUsersData;
    } catch (notifyError) {
      console.log('ERROR GET ALL USERS => ', notifyError);
      throw new BadRequestException(notifyError.message);
    }
  }
}
