import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersAdminV1Controller } from './users.admin.v1.controller';
import { UsersV1Controller } from './users.v1.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
  controllers: [UsersAdminV1Controller, UsersV1Controller],
  providers: [UsersService],
})
export class UsersModule {}
