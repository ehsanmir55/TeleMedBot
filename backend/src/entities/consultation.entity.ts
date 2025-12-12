import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';
import { PatientProfile } from './patient-profile.entity';

export enum ConsultationStatus {
    PENDING = 'pending',
    PAID = 'paid',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

@Entity()
export class Consultation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => DoctorProfile)
    doctor: DoctorProfile;

    @ManyToOne(() => PatientProfile)
    patient: PatientProfile;

    @Column({
        type: 'enum',
        enum: ConsultationStatus,
        default: ConsultationStatus.PENDING
    })
    status: ConsultationStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ nullable: true })
    contractAddress: string;

    @Column({ nullable: true })
    transactionHash: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
