import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InvoicesController } from "./modules/invoices/invoices.controller";

import { InvoicesService } from "./modules/invoices/invoices.service";
import { InvoicesModule } from "./modules/invoices/invoices.module";
import { PrismaService } from "./prisma/prisma.service";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ConfigModule } from '@nestjs/config';
import { UsersController } from "./modules/users/users.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
    PrismaModule, //import this one time here and is avaiable in all modules
    InvoicesModule,
    UsersModule,
    ConfigModule.forRoot(),
    AuthModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
    
    
  ],
  controllers: [AppController, InvoicesController, UsersController],
  providers: [AppService, InvoicesService, PrismaService],
})
export class AppModule {}
