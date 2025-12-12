import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PatientProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.patientProfile)
    @JoinColumn()
    user: User;

    @Column({ type: 'jsonb', nullable: true })
    medicalHistory: {
        chiefComplaint?: string;
        history?: string;
        medications?: string;
        surgeries?: string;
        allergies?: string;
    };

    @Column('simple-array', { nullable: true })
    medicalRecordFiles: string[]; // URLs

    @Column({ nullable: true })
    idCardUrl: string;
}
