import { DataTypes, Model } from 'sequelize';
import { connectionSequalize } from 'src/database/connection/sequelize';

export class RolesEntity extends Model<any, any> {
  declare id: number;
  declare name_role: string;
  declare label: string;
}

export const RolesEntityInit = () => {
  return RolesEntity.init(
    {
      name_role: DataTypes.STRING,
      label: DataTypes.STRING,
    },
    {
      sequelize: connectionSequalize(),
      tableName: 'roles',
    },
  );
};
