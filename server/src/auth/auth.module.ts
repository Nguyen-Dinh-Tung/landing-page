import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AcountsService } from 'src/acounts/services/acounts.service';
import { CacheModule } from '@nestjs/cache-manager';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/core/jwt/local-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/core/jwt/jwt.strategy';
import { WinstonModule } from 'src/core/winston/winston.module';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    CacheModule.register({}),
    WinstonModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AcountsService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
