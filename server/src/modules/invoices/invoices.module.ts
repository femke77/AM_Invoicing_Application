import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { JwtService } from "@nestjs/jwt";
import { PaginationMiddleware } from "../../middleware/pagination.middleware";
import { InvoicesProcessor } from "./invoices.processor";
import { BullModule } from "@nestjs/bullmq";

@Module({
  imports: [
 
    BullModule.registerQueue({
      name: "taskQueue",
    }),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService, JwtService, InvoicesProcessor],
})
export class InvoicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: "invoices", method: RequestMethod.GET });
  }
}
