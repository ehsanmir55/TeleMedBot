import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { DoctorProfile } from './entities/doctor-profile.entity';
import { PatientProfile } from './entities/patient-profile.entity';
import { Consultation } from './entities/consultation.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('POSTGRES_HOST') || 'localhost',
                port: parseInt(configService.get<string>('POSTGRES_PORT') || '5432', 10),
                username: configService.get<string>('POSTGRES_USER') || 'telemed',
                password: configService.get<string>('POSTGRES_PASSWORD') || 'telemedpassword',
                database: configService.get<string>('POSTGRES_DB') || 'telemedbot',
                entities: [User, DoctorProfile, PatientProfile, Consultation],
                synchronize: true,
                ssl: configService.get<string>('POSTGRES_HOST') !== 'localhost',
                extra: configService.get<string>('POSTGRES_HOST') !== 'localhost'
                    ? { ssl: { rejectUnauthorized: false } }
                    : undefined,
            }),
        }),
    ],
})
export class DatabaseModule { }
