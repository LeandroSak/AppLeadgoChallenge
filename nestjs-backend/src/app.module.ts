import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Task} from './task/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestdb',
      entities: [Task],
      synchronize: true
    }),
    TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
