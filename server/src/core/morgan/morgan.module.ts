import { MorganInterceptor, MorganModule as morgan } from 'nest-morgan';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as chalk from 'chalk';
@Module({
  imports: [morgan],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor(
        `${chalk.green(
          '[:method]',
        )} :remote-addr [] :remote-user [:date[clf]] ":url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ${chalk.yellow(
          '[data::body]',
        )} :response-time ms)`,
      ),
    },
  ],
})
export class MorganModule {}
