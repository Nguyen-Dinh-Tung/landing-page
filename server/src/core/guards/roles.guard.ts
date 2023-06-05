import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesInterface } from '../interfaces/roles.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RolesInterface>('random', [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    return true;
  }
}

