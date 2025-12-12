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
                host: 'localhost',
                port: 5432,
                username: 'telemed',
                password: 'telemedpassword',
                database: 'telemedbot',
                entities: [User, DoctorProfile, PatientProfile, Consultation],
                synchronize: true, // Auto-create tables (Dev only)
            }),
        }),
    ],
})
export class DatabaseModule { }
