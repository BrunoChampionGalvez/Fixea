import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Contract } from '../contracts/contracts.entity'

@Entity('project_tracking')
export class ProjectTracking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Contract, contract => contract.projectTracking, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'contract_id' })
    contract: Contract

    @Column('jsonb')
    progress: Record<string, any>; // progress updates and milestone achievements

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    last_updated: Date;
}
