import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Worker } from '../workers/workers.entity'

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, customer => customer.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: User

    @ManyToOne(() => Worker, worker => worker.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'worker_id' })
    worker: Worker

    @Column('integer')
    score: number; // between 1 and 5

    @Column('text')
    comment: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
