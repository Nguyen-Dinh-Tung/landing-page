import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcountsEntity } from './entities/acounts.entity';
import { AcountsService } from './services/acounts.service';
import { AcountsController } from './controller/acounts.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { WinstonModule } from 'src/core/winston/winston.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AcountsEntity]),
    CacheModule.register({}),
    MulterModule.register({
      dest: './data/images',
    }),
    WinstonModule,
  ],
  controllers: [AcountsController],
  providers: [AcountsService],
})
export class AcountsModule {}
