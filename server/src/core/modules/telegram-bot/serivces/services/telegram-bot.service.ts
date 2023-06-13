import { Response } from 'express';
import { Service } from 'nestgram';
import { OnCommand, Controller } from 'nestgram';
@Service()
export class TelegramBotService {
  async createMessage(message: string, res: Response) {}

  async joinGroup() {}
}
