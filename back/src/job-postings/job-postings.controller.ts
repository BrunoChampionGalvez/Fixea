import { Body, Controller, Get, Post } from "@nestjs/common";
import { JobPostingsService } from "./job-postings.service";
import { CreateJobPostingDto } from "./job-postings.dtos";

@Controller('job-postings')
export class JobPostingsController {
    constructor(private readonly jobPostingsService: JobPostingsService) { }
    
    @Get()
    getJobPostings() {
        return this.jobPostingsService.getJobPostings()
    }

    @Post()
    createJobPosting(@Body() jobPostingData: CreateJobPostingDto) {
        return this.jobPostingsService.createJobPosting(jobPostingData)
    }
}