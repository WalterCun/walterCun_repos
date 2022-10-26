import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/default';

// Generacion de variables globales que cargan mediante las variables de entorno los datos de ejecucion
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [configuration.KEY],
      useFactory: (configService: ConfigType<typeof configuration>) => {
        const { user, host, dbName, password, port, cluster } = configService.database;
        return {
          type: "cockroachdb",
          url: `postgresql://${user}:${password}@${host}:${port}/${dbName}?sslmode=verify-full`,
          ssl: true,
          extra: {
            options: `--cluster=${cluster}`,
          },
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DBModule { }