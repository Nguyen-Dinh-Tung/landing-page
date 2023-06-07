import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/databases/database.module';
import { AcountsModule } from './acounts/acounts.module';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtAuthGuard } from './core/guards/jwt-auth.guard';
import { WinstonModule } from './core/winston/winston.module';
import { WinstonService } from './core/winston/winston.service';

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
    WinstonModule,
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
