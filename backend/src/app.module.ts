import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { BotModule } from './bot/bot.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        DatabaseModule,
        BotModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
