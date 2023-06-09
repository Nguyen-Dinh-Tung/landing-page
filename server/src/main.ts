import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { WinstonService } from './core/winston/winston.service';
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {});
  app.init();
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Landing page')
    .setDescription('The landing page api')
    .setVersion('1.0')
    .build();
  // app.useGlobalInterceptors(new RequestInterceptor(app.get(WinstonService)));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open', app, document);
  await app.listen(process.env.SERVER_PORT, () => {
    console.log('Server port ' + process.env.SERVER_PORT);
  });
}
bootstrap();
