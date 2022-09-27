import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './modules/post.module';

import { UserModule } from './modules/user.module';
import { RolesModule } from './modules/roles.module';
import { AuthModule } from './modules/auth.module';
import { ConfigureModule } from './modules/configure.module';
import { TokenModule } from './modules/token.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.1v8ml.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    PostsModule,
    RolesModule,
    AuthModule,
    ConfigureModule,
    TokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
