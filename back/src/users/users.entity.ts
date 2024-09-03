import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Worker } from 'src/workers/workers.entity';
import { Review } from 'src/reviews/reviews.entity';
import { Contract } from 'src/contracts/contracts.entity';
import { JobPosting } from 'src/job-postings/job-postings.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Roles } from 'src/auth/roles.enum';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text', { unique: true, nullable: true })
    username: string;

    @Column('text', { unique: true, nullable: true })
    email: string;

    @Column('text')
    password: string;

    @Column({ type: 'text', default: Roles.User })
    role: string

    @Column('text', { nullable: true })
    profile_picture: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date

    @OneToMany(() => Worker, worker => worker.users)
    workers: Worker[];

    @OneToMany(() => Review, review => review.customer)
    reviews: Review[]

    @OneToMany(() => Contract, contract => contract.user)
    contracts: Contract[]

    @OneToMany(() => JobPosting, jobPosting => jobPosting.customer)
    jobPostings: JobPosting[]

    @OneToMany(() => Appointment, appointment => appointment.customer)
    appointments: Appointment[]
}
