import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma-service/prisma.service";
import { Invoice, Prisma } from "@prisma/client";

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async invoice(
    invoiceWhereUniqueInput: Prisma.InvoiceWhereUniqueInput
  ): Promise<Invoice | null> {
    return this.prisma.invoice.findUnique({
      where: invoiceWhereUniqueInput,
      include: {user: true},
      
    });
    
  }

  async invoices(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InvoiceWhereUniqueInput;
    where?: Prisma.InvoiceWhereInput;
    orderBy?: Prisma.InvoiceOrderByWithRelationInput;
  },): Promise<Invoice[]> {
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

  async getTotalInvoiceAmount(): Promise<number> {
    const total = await this.prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
    });

    return total._sum.amount || 0;
  }
}
