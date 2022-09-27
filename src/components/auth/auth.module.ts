import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesModule } from '../roles/roles.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    UserModule,
    RolesModule,
    TokenModule,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
