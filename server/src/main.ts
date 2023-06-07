import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { WinstonService } from './core/winston/winston.service';
import { RequestInterceptor } from './core/winston/interceptor/request.interceptor';
import * as chalk from 'chalk';
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
  app.useLogger(app.get(WinstonService));
  app.useGlobalInterceptors(new RequestInterceptor(app.get(WinstonService)));
  morgan.token('body', function (req) {
    if (!req['originalUrl'].includes('/login')) {
      return JSON.stringify({
        body: req['body'],
        query: req['query'],
      });
    }
    return '{}';
  });
  app.use(
    morgan(
      `${chalk.green(
        '[:method]',
      )} :remote-addr [] :remote-user [:date[clf]] ":url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ${chalk.yellow(
        '[data::body]',
      )} :response-time ms`,
    ),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('open', app, document);
  await app.listen(process.env.SERVER_PORT, () => {
    console.log('Server port ' + process.env.SERVER_PORT);
  });
}
bootstrap();
