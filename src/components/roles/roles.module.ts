import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles, RolesSchema } from 'src/schemas/roles.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },
      { name: User.name, schema: UserSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [RolesService],
})
export class RolesModule {}
