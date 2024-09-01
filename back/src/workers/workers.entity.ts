import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Review } from 'src/reviews/reviews.entity';
import { Contract } from 'src/contracts/contracts.entity';
import { Appointment } from 'src/appointments/appointments.entity';
import { Application } from 'src/applications/applications.entity';

@Entity('workers')
export class Worker {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.workers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    users: User[]

    @Column('text')
    services: string;

    @Column('text')
    skills: string;

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
