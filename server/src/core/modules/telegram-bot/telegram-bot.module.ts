import { Module } from 'nestgram';
import { TelegramBotController } from './serivces/controller/telegram-bot.controller';
import { TelegramBotService } from './serivces/services/telegram-bot.service';

@Module({
  imports: [],
  controllers: [TelegramBotController],
  services: [TelegramBotService],
})
export class TelegramBotModule {}
