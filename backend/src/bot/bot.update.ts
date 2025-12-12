import { Update, Ctx, Start, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
    constructor(private readonly botService: BotService) { }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        await this.botService.start(ctx);
    }

    @Command('register')
    async onRegister(@Ctx() ctx: Context) {
        await ctx.reply('To register, please open the Mini App.');
    }
}
