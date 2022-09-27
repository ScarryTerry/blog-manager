import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '../controllers/user.controller';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [],
  exports: [UserService],
})
export class UserModule {}