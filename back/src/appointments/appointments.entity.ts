import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Worker } from '../workers/workers.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: User

    @ManyToOne(() => Worker, worker => worker.appointments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'worker_id' })
    worker: Worker

    @Column('timestamptz')
    appointment_date: Date;

    @Column('text')
    purpose: string;

    @Column('text')
    status: string; // 'scheduled', 'completed', 'canceled'
}
