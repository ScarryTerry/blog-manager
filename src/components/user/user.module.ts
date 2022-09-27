import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, RolesSchema } from 'src/schemas/roles.schema';
import { UserController } from './user.controller';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserService } from './user.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Roles.name, schema: RolesSchema },
    ]),
    RolesModule,
  ],
  exports: [UserService],
})
export class UserModule {}
