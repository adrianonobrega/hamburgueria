import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
