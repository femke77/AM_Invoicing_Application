import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '../../prisma-service/prisma.module';
import { PaginationMiddleware } from '../../middleware/pagination.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, JwtService],
})
export class InvoicesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PaginationMiddleware)
      .forRoutes({ path: 'invoices', method: RequestMethod.GET });
  }
}
