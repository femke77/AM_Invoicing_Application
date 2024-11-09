import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  Min,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  vendor_name: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsString()
  @IsNotEmpty()
  due_date: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsOptional()
  user_id?: number;

  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;
}
