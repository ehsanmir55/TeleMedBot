import { Update, Ctx, Start, Command, Action } from 'nestjs-telegraf';
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

    @Action(/set_lang:(.+)/)
    async onSetLanguage(@Ctx() ctx: Context) {
        // Extract lang from data "set_lang:en"
        const data = (ctx.callbackQuery as any).data;
        const lang = data.split(':')[1];
        await this.botService.setLanguage(ctx, lang);
    }
}
