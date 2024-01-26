import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from 'src/configs/database/typeorm-config';
import { TasksModule } from 'src/tasks/tasks.module';
import { ConfigModule } from 'src/configs/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule,
    TasksModule,
  ],
})
export class AppModule {}
