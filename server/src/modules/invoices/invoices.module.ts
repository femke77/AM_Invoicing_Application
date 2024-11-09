import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { JwtService } from "@nestjs/jwt";
import { PrismaModule } from "../../prisma-service/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, JwtService],
})
export class InvoicesModule {}
