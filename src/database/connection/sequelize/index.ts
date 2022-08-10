import { Sequelize } from 'sequelize';
import { general } from 'src/configs';

export const connectionSequalize = () => {
  const databaseData = {
    host: general.hostMysql,
    port: 3306,
    username: general.userMysql,
    password: general.passwordMysql,
    database: general.databaseMysql,
  };

  return new Sequelize(
    databaseData.database,
    databaseData.username,
    databaseData.password,
    {
      host: databaseData.host,
      dialect: 'mysql',
      logging: false,
    },
  );
};
