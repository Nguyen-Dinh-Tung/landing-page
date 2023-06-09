import { TelegramModule } from 'nestjs-telegram';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegramBotSerivce } from './service/telegram-bot.service';
@Module({
  imports: [
    TelegramModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return { botKey: configService.get('TELEGRAM_BOT_KEY') };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [TelegramBotSerivce],
})
export class TelegramBotModule {}
