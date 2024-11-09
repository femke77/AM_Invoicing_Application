// dto for swagger documentation
import { ApiProperty } from '@nestjs/swagger';

export class InvoiceDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'ABC Supplies' })
  vendor_name: string;

  @ApiProperty({ example: 500 })
  amount: number;

  @ApiProperty({ example: '2024-12-31' })
  due_date: string;

  @ApiProperty({ example: 'Monthly office supplies' })
  description: string;

  @ApiProperty({ example: 1, nullable: true })
  user_id?: number;

  @ApiProperty({ example: false })
  paid: boolean;
}
