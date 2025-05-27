import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'order_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 5000,
    }),
    OrdersModule,
    UsersModule,
  ],
})
export class AppModule {}
