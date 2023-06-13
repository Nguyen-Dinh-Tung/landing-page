import { Service } from 'nestgram';
@Service()
export class TelegramBotCommandService {
  start() {
    return 'Hello fen';
  }
}
