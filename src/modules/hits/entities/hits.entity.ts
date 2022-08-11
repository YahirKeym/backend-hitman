import { DataTypes, Model } from 'sequelize';
import { connectionSequalize } from 'src/database/connection/sequelize';

export class HitsEntity extends Model<any, any> {
  declare id_hit: number;
  declare user_assigned: number;
  declare description_hit: string;
  declare name_target: string;
  declare status: number;
  declare user_creator: number;
}

export const HitsEntityInit = () => {
  return HitsEntity.init(
    {
      user_assigned: DataTypes.NUMBER,
      description_hit: DataTypes.STRING,
      name_target: DataTypes.STRING,
      status: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
      },
      user_creator: DataTypes.NUMBER,
    },
    {
      sequelize: connectionSequalize(),
      tableName: 'hits',
    },
  );
};
