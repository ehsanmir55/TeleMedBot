import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class DoctorProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.doctorProfile)
    @JoinColumn()
    user: User;

    @Column()
    specialty: string;

    @Column()
    city: string;

    @Column('decimal', { precision: 10, scale: 2 })
    consultationFee: number; // In USDT/TON

    @Column({ type: 'text', nullable: true })
    bio: string;

    @Column('simple-array', { nullable: true })
    certificates: string[]; // URLs to uploaded files

    @Column({ nullable: true })
    idCardUrl: string;

    @Column({ default: 0, type: 'float' })
    rating: number;

    @Column({ default: 0 })
    consultationCount: number;

    @Column({ default: false })
    isApproved: boolean;
}
