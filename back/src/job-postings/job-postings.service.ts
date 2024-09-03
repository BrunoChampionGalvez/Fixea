import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JobPosting } from "./job-postings.entity";
import { Repository } from "typeorm";
import { User } from "src/users/users.entity";

@Injectable()
export class JobPostingsService {
    constructor(
        @InjectRepository(JobPosting) private readonly jobPostingsRepository: Repository<JobPosting>,
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) { }

    async getJobPostings() {
        return await this.jobPostingsRepository.find()
    }

    async createJobPosting(jobPostingData) {
        const { userId, title, description, budget } = jobPostingData
        const user = await this.usersRepository.findOneBy({ id: userId })
        if (!user) throw new NotFoundException('User not found.')
        return await this.jobPostingsRepository.save({ user, title, description, budget })
    }
}