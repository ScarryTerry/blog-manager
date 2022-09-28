import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './components/app/app.module';

async function bootstrap() {
  const port = process.env.PORT || 3003;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog Manager')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const apiDoc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/doc', app, apiDoc);

  await app.listen(port, () => console.log(`Server started on port ${port}`));
}
bootstrap();
