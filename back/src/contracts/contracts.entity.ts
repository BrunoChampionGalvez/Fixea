import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { JobPosting } from '../job-postings/job-postings.entity';
import { Worker } from '../workers/workers.entity';
import { ProjectTracking } from 'src/project-trackings/project-trackings.entity';
import { User } from 'src/users/users.entity';
import { ContractStatus } from './contracts.enum';
import { Milestone } from 'src/milestones/milestones.entity';

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => JobPosting, jobPosting => jobPosting.contract, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'job_posting_id' })
    jobPosting: JobPosting

    @ManyToOne(() => Worker, worker => worker.contracts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'worker_id' })
    worker: Worker

    @ManyToOne(() => User, user => user.contracts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column('numeric')
    total_amount: number;

    @Column('enum', { enum: [ContractStatus.Active, ContractStatus.Completed], default: ContractStatus.Active })
    status: ContractStatus; // 'active', 'completed'

    @OneToMany(() => ProjectTracking, projectTracking => projectTracking.contract)
    projectTracking: ProjectTracking

    @OneToMany(() => Milestone, milestone => milestone.contract)
    milestones: Milestone[]
}
