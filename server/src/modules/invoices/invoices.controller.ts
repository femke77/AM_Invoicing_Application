// import { CreateInvoiceDto } from "./dto/create-invoice.dto";
// import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { Prisma } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvoiceDto } from './dto/invoice.dto';

@ApiTags('invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [InvoiceDto],
  })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'cursor', required: false, type: Number })
  async getInvoices(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: Prisma.InvoiceWhereInput,
    @Query('orderBy') orderBy?: Prisma.InvoiceOrderByWithRelationInput,
  ) {
    return this.invoicesService.invoices({
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
      cursor: cursor ? { id: +cursor } : undefined,
      where,
      orderBy,
    });
  }

  @Get('total')
  @ApiOperation({ summary: 'Get total of all invoices' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Number,
  })
  async getTotalInvoiceAmount(): Promise<number> {
    return this.invoicesService.getTotalInvoiceAmount();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single invoice by id' })
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: [InvoiceDto],
  })
  async getInvoice(@Param('id') id: string) {
    return this.invoicesService.invoice({ id: +id });
  }

  // following code was generated automatically by the NestJS CLI and is not requested by client
  // but would be usually implemented in a real-world application

  // @Post()
  // @ApiResponse({ status: 201, description: "Invoice created." })
  // create(@Body() createInvoiceDto: CreateInvoiceDto) {
  //   return this.invoicesService.createInvoice(createInvoiceDto);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
  //   return this.invoicesService.updateInvoice({
  //     where: { id: +id },
  //     data: updateInvoiceDto,
  //   });
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.invoicesService.deleteInvoice({ id: +id });
  // }
}
