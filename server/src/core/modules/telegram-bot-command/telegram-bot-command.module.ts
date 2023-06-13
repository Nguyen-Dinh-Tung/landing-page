import { Module } from 'nestgram';
import { TelegramBotController } from './controller/telegram-bot.command';
import { TelegramBotCommandService } from './services/telegram-bot-command.service';
@Module({
  imports: [],
  services: [TelegramBotCommandService],
  controllers: [TelegramBotController],
})
export class TelegramBotCommandModule {}
