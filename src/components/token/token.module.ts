import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from 'src/schemas/token.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { TokenService } from '../token/token.service';
import { RolesModule } from '../roles/roles.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
