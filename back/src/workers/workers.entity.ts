import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Review } from 'src/reviews/reviews.entity';
import { Contract } from 'src/contracts/contracts.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Application } from 'src/applications/applications.entity';
import { Roles } from 'src/auth/roles.enum';

@Entity('workers')
export class Worker {
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

    @Column('text')
    country: string;

    @Column('text')
    city: string;

    @Column({ type: 'text', default: Roles.Worker })
    role: string

    @Column('text', { nullable: true })
    profile_picture: string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date

    @ManyToOne(() => User, user => user.workers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    users: User[]

    @Column('text', {array: true, nullable: true})
    services: string[];

    @Column('text', { array: true, nullable: true})
    skills: string[];

    @Column('jsonb', { nullable: true })
    portfolio: Record<string, any>;

    @Column('jsonb', { nullable: true })
    analytics: Record<string, any>;

    @OneToMany(() => Review, review => review.worker)
    reviews: Review[]

    @OneToMany(() => Contract, contract => contract.worker)
    contracts: Contract[]

    @OneToMany(() => Appointment, appointment => appointment.worker)
    appointments: Appointment[]

    @OneToMany(() => Application, application => application.worker)
    applications: Application[]
}
