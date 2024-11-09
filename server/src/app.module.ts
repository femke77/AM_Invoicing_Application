import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InvoicesController } from "./modules/invoices/invoices.controller";
import { InvoicesService } from "./modules/invoices/invoices.service";
import { InvoicesModule } from "./modules/invoices/invoices.module";
import { PrismaService } from "./prisma-service/prisma.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from '@nestjs/config';
import { UsersController } from "./modules/users/users.controller";

@Module({
  imports: [
    InvoicesModule,
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController, InvoicesController, UsersController],
  providers: [AppService, InvoicesService, PrismaService],
})
export class AppModule {}