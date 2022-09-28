import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '../posts/post.module';

import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigureModule } from '../configure/configure.module';
import { TokenModule } from '../token/token.module';

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
