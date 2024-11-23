import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { type Request, type Response, type NextFunction } from "express";
import { junit } from "node:test/reporters";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, "..", "client", "dist")); 
 console.log(join(__dirname, "..", "client", "dist"));
 
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.path.startsWith('/api') && !req.path.includes('.')) {
      res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));
    } else {
      next();
    }
  });
  app.setGlobalPrefix("api");
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle("User Invoices API")
    .setDescription("API documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3001);
}

bootstrap();


