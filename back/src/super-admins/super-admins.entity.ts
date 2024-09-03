import { Roles } from "src/auth/roles.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'super_admins' })
export class SuperAdmin {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column('text', { unique: true, nullable: true })
    username: string

    @Column('text', { unique: true, nullable: true })
    email: string

    @Column('text')
    password: string

    @Column('text', { default: Roles.SuperAdmin })
    role: string

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', nullable: true })
    lastLogin: Date
}