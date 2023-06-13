import { OnCommand, Controller, CommandParams, Text } from 'nestgram';

@Controller()
export class TelegramBotController {
  @OnCommand('start')
  async startMessage() {
    return 'hello';
  }
  @OnCommand('con_me_may')
  async testCommand(@Text() text: string) {
    return 'Chửi cc';
  }
}
