import { DataTypes, Model } from 'sequelize';
import { connectionSequalize } from 'src/database/connection/sequelize';

export class UsersEntity extends Model<any, any> {
  declare id: number;
  declare role: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare active: number;
  declare assigned: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

export const UsersEntityInit = () => {
  return UsersEntity.init(
    {
      role: {
        type: DataTypes.NUMBER,
        defaultValue: 3,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      active: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
      },
      assigned: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
      },
    },
    {
      sequelize: connectionSequalize(),
      tableName: 'users',
    },
  );
};
