import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserLanguage } from '../entities/user.entity';
import { Context, Markup } from 'telegraf';

const MESSAGES = {
    [UserLanguage.EN]: {
        welcome: 'Welcome to TeleMedBot! You have been registered as a Patient.',
        back: 'Welcome back',
        select_lang: 'Please select your language:',
        open_app: 'Open App',
        register_prompt: 'Please use /register to complete your profile.',
    },
    [UserLanguage.FA]: {
        welcome: 'به TeleMedBot خوش آمدید! شما به عنوان بیمار ثبت نام شدید.',
        back: 'خوش آمدید',
        select_lang: 'لطفاً زبان خود را انتخاب کنید:',
        open_app: 'باز کردن برنامه',
        register_prompt: 'لطفاً برای تکمیل پروفایل از /register استفاده کنید.',
    },
    [UserLanguage.AR]: {
        welcome: 'مرحبًا بك في TeleMedBot! تم تسجيلك كمريض.',
        back: 'مرحبًا بعودتك',
        select_lang: 'يرجى اختيار لغتك:',
        open_app: 'فتح التطبيق',
        register_prompt: 'يرجى استخدام /register لإكمال ملف التعريف الخاص بك.',
    },
};

@Injectable()
export class BotService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async start(ctx: Context) {
        const telegramId = ctx.from.id.toString();
        let user = await this.userRepository.findOne({ where: { telegramId } });

        if (!user || !user.language) {
            await ctx.reply(
                '🌐 Select Language / انتخاب زبان / اختر اللغة',
                Markup.inlineKeyboard([
                    [Markup.button.callback('English 🇺🇸', 'set_lang:en')],
                    [Markup.button.callback('فارسی 🇮🇷', 'set_lang:fa')],
                    [Markup.button.callback('العربية 🇸🇦', 'set_lang:ar')],
                ])
            );
            return;
        }

        await this.sendWelcome(ctx, user);
    }

    async setLanguage(ctx: Context, lang: string) {
        const telegramId = ctx.from.id.toString();
        const validLang = Object.values(UserLanguage).includes(lang as UserLanguage)
            ? (lang as UserLanguage)
            : UserLanguage.EN;

        let user = await this.userRepository.findOne({ where: { telegramId } });
        if (!user) {
            user = this.userRepository.create({
                telegramId,
                username: ctx.from.username,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
                role: UserRole.PATIENT,
                language: validLang,
            });
        } else {
            user.language = validLang;
        }
        await this.userRepository.save(user);
        await ctx.answerCbQuery();
        await this.sendWelcome(ctx, user);
    }

    private async sendWelcome(ctx: Context, user: User) {
        const lang = user.language || UserLanguage.EN;
        const texts = MESSAGES[lang];

        await ctx.reply(`${texts.back} ${user.firstName}! ${texts.welcome} ${texts.register_prompt}`);

        // Send Web App Button with Lang Param
        const webAppUrl = `${process.env.WEBAPP_URL || 'https://google.com'}?lang=${lang}`;
        await ctx.reply(texts.open_app, {
            reply_markup: {
                inline_keyboard: [
                    [{ text: texts.open_app, web_app: { url: webAppUrl } }]
                ]
            }
        });
    }
}
