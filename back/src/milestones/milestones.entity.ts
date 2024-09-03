import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MilestoneStatus } from "./milestones.enum";
import { Contract } from "src/contracts/contracts.entity";

@Entity({ name: 'milestones' })
export class Milestone {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'text' })
    title: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'enum', enum: [MilestoneStatus.Completed, MilestoneStatus.ToComplete], default: MilestoneStatus.ToComplete })
    status: MilestoneStatus

    @Column('numeric')
    percentage: number

    @ManyToOne(() => Contract, contract => contract.milestones)
    contract: Contract
}