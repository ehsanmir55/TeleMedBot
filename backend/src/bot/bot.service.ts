import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Context } from 'telegraf';

@Injectable()
export class BotService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async start(ctx: Context) {
        const telegramId = ctx.from.id.toString();
        const user = await this.userRepository.findOne({ where: { telegramId } });

        if (!user) {
            await this.userRepository.save({
                telegramId,
                username: ctx.from.username,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
                role: UserRole.PATIENT, // Default role
            });
            await ctx.reply('Welcome to TeleMedBot! You have been registered as a Patient. Please use /register to complete your profile or switch to Doctor.');
        } else {
            await ctx.reply(`Welcome back, ${user.firstName}!`);
        }

        // Send Web App Button
        await ctx.reply('Open TeleMedBot Mini App:', {
            reply_markup: {
                inline_keyboard: [
                    [{ text: 'Open App', web_app: { url: process.env.WEBAPP_URL || 'https://google.com' } }]
                ]
            }
        });
    }
}
