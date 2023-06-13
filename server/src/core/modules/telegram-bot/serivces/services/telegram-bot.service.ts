import { Injectable, HttpStatus } from '@nestjs/common';
import { TelegramService } from 'nestjs-telegram';
import axios from 'axios';
import { AppRes } from 'src/core/res/res';
import { Response } from 'express';
import { messageInsertEntities } from 'src/common/contants/message';
import { ENITIES_ENUM } from 'src/core/enums/entities.enum';
@Injectable()
export class TelegramBotService {
  constructor(private readonly telegramSerivce: TelegramService) {}
  async createMessage(message: string, res: Response) {
    await this.telegramSerivce
      .sendMessage({
        chat_id: process.env.TELEGRAM_KEYGROUP_TEST,
        text: message,
      })
      .toPromise();
    return AppRes(
      messageInsertEntities(ENITIES_ENUM.MESSAGE),
      HttpStatus.OK,
      res,
    );
  }
  async joinGroup() {}
}
