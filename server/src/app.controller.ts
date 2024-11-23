import { AppService } from './app.service';
import { Controller, 
  // Get, 
  // Res 
} from '@nestjs/common';
// import { Response } from 'express';
// import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('*')
  // index(@Res() res: Response) {
  //   res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'));   }
}
