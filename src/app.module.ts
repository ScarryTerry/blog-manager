import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './components/posts/post.module';

import { UserModule } from './components/user/user.module';
import { RolesModule } from './components/roles/roles.module';
import { AuthModule } from './components/auth/auth.module';
import { ConfigureModule } from './components/configure/configure.module';
import { TokenModule } from './components/token/token.module';

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
