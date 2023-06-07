import { Module } from '@nestjs/common';
import { WinstonService } from './winston.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestInterceptor } from './interceptor/request.interceptor';
@Module({
  imports: [],
  providers: [WinstonService],
})
export class WinstonModule {}
