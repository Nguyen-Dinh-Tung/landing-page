import { Injectable } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
@Injectable()
export class TelegramBotSerivce {
  constructor(private readonly telegram: TelegramService) {}
  testBot() {
    console.log(this.telegram.getMe());
  }
}
