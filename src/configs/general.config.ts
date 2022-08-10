const generalConfigs = {
  hostMysql: process.env.MYSQL_HOST || 'kitkat',
  userMysql: process.env.MYSQL_USER || 'kitkat_user',
  passwordMysql: process.env.MYSQL_PASS || 'kitkat_password',
  databaseMysql: process.env.MYSQL_DATABASE || 'kitkat_database',
  env: process.env.ENV || 'kitkat_env',
};

export default generalConfigs;
