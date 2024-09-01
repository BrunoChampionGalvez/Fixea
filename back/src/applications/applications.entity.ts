import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { JobPosting } from '../job-postings/job-postings.entity';
import { Worker } from '../workers/workers.entity';

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => JobPosting, jobPosting => jobPosting.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'job_posting_id' })
    jobPosting: JobPosting

    @ManyToOne(() => Worker, worker => worker.applications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'worker_id' })
    worker: Worker

    @Column('numeric')
    bid_amount: number;

    @Column('text')
    estimate_breakdown: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
