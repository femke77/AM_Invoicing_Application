import { IsInt, IsOptional, IsString, IsBoolean, Min } from 'class-validator';

export class UpdateInvoiceDto {
  @IsString()
  @IsOptional()
  vendor_name?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  due_date?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsBoolean()
  @IsOptional()
  paid?: boolean;
}
