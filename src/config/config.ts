import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const {
  ENV,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  APP_PORT,
  BCRYPT_SECRET,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

const database: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  autoLoadEntities: true,
  extra: {
    ssl: true,
  },
};

export function config() {
  return {
    env: ENV,
    port: Number(APP_PORT),
    bcrypt_password: BCRYPT_SECRET,
    access_token_secret: JWT_ACCESS_SECRET,
    refresh_token_secret: JWT_REFRESH_SECRET,
    database,
  };
}
