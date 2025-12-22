import { Module } from '@nestjs/common';
import { StatusModule } from './status/status.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [StatusModule, AuthModule, UsersModule, ProductsModule],
})
export class AppModule {}
