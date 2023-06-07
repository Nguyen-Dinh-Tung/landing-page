import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { WinstonService } from '../winston.service';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly winstonService: WinstonService) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    this.winstonService.apiLog(request);
    return next.handle();
  }
}
