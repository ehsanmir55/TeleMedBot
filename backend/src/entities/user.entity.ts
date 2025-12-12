import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { PatientProfile } from './patient-profile.entity';

export enum UserRole {
    PATIENT = 'patient',
    DOCTOR = 'doctor',
    ADMIN = 'admin',
}

export enum UserLanguage {
    EN = 'en',
    FA = 'fa',
    AR = 'ar',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    telegramId: string; // From Telegram

    @Column({ nullable: true })
    username: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.PATIENT
    })
    role: UserRole;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    walletAddress: string; // TON/USDT wallet

    @Column({ default: 'en' })
    language: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => DoctorProfile, (profile) => profile.user, { nullable: true })
    doctorProfile: DoctorProfile;

    @OneToOne(() => PatientProfile, (profile) => profile.user, { nullable: true })
    patientProfile: PatientProfile;
}
