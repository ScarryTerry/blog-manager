import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles, RolesSchema } from 'src/schemas/roles.schema';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    MongooseModule.forFeature([
      { name: Roles.name, schema: RolesSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
