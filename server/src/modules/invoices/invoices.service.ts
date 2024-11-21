import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Invoice, Prisma } from "@prisma/client";
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class InvoicesService {
  
  constructor(private prisma: PrismaService,
    @InjectQueue('taskQueue') private readonly taskQueue: Queue

   ) {}

  async invoice(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
      include: { user: true },
    });
  }

  async invoices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  }): Promise<Invoice[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.invoice.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        user: true,
      },
    });
  }

  async createInvoice(data: Prisma.InvoiceCreateInput): Promise<Invoice> {
    return this.prisma.invoice.create({
      data,
    });
  }

  async updateInvoice(params: {
    where: Prisma.InvoiceWhereUniqueInput;
    data: Prisma.InvoiceUpdateInput;
  }): Promise<Invoice> {
    const { data, where } = params;
    return this.prisma.invoice.update({
      where,
      data,
    });
  }

  async deleteInvoice(where: Prisma.InvoiceWhereUniqueInput): Promise<Invoice> {
    return this.prisma.invoice.delete({
      where,
    });
  }

  async getTotalInvoiceAmount(dueDate?: string): Promise<number> {
    const whereClause = dueDate ? { due_date: { contains: dueDate } } : {};

    const total = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: whereClause,
    });

    return total._sum.amount || 0;
  }

  async longTask(): Promise<{jobId: string, message: string}> {
    const job = await this.taskQueue.add('longTask', {
      payload: 'example payload',
    })
    
    return {jobId: job.id, message: "task is started!"};
  }

  async getTaskStatus(jobId: string): Promise<{status: string, result?: string}> {
    const job = await this.taskQueue.getJob(jobId);
    if (!job) return { status: 'not found' };
    const status = await job.getState();
    return { status, result: job.data.payload };
  }
}
