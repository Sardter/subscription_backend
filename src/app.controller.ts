import { Controller, Get } from '@nestjs/common';
import { GeneratorService } from './app.service';

@Controller()
export class AppController {
  constructor(private service: GeneratorService) {}

  @Get('generate_data')
  async generateMockData(): Promise<string> {
    await this.service.generateMockData();
    return 'Mock data generated, user Swagger UI to test the data';
  }
}
