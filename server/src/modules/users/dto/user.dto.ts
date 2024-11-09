// dto for swagger documentation
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceDto } from '../../invoices/dto/invoice.dto';

export class UserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe', required: false })
  name?: string;

  @ApiProperty({ type: [InvoiceDto], required: false })
  invoices?: InvoiceDto[];
}
