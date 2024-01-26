import { DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import * as process from 'process';
import { extname } from 'path';

export const databaseConfiguration = (
  isMigrationRun = true,
): DataSourceOptions => {
  const env = process.env.APP_ENV;
  const migrationFolder =
    env === 'local' ? __dirname + '/migrations' : 'database/migrations';
  const ext = extname(__filename);

  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
      `**/*.entity${ext}`, // used for typeorm CLI in local development
      ...getMetadataArgsStorage().tables.map((tbl) => tbl.target), // used for proper HMR work
    ],
    migrations: [`${migrationFolder}/${ext}`],
    migrationsTableName: 'migrations',
    migrationsRun: isMigrationRun,
    logging: true,
    synchronize: true,
  };
};
