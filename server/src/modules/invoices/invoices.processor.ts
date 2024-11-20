import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('taskQueue')
export class InvoicesProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    console.log('Processing job:', job.name, job.data);

    await new Promise((resolve) => setTimeout(resolve, 15000));

    console.log('Task completed:', job.id);
  }
}