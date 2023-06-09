import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/databases/database.module';
import { AcountsModule } from './acounts/acounts.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { WinstonService } from './core/winston/winston.service';
import { MorganModule } from './core/morgan/morgan.module';
import { WinstonModule } from './core/winston/winston.module';
import { TelegramModule } from 'nestjs-telegram';
import { TelegramBotModule } from './core/modules/telegram-bot/teletegram-bot.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      expandVariables: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../data/images/'),
      serveRoot: '/data/images/',
    }),
    MulterModule.register({
      dest: '/data/images',
    }),
    DatabaseModule,
    AcountsModule,
    AuthModule,
    MorganModule,
    WinstonModule.register('admin'),
    TelegramBotModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    WinstonService,
  ],
  exports: [],
})
export class AppModule {}
