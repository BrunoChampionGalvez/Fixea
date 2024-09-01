import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { Contract } from 'src/contracts/contracts.entity';
import { Application } from 'src/applications/applications.entity';

@Entity('job_postings')
export class JobPosting {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.jobPostings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'customer_id' })
    customer: User

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column('numeric')
    budget: number;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('text')
    status: string; // 'open' or 'closed'

    @OneToMany(() => Contract, contract => contract.jobPosting)
    contract: Contract

    @OneToMany(() => Application, application => application.jobPosting)
    applications: Application[]
}
