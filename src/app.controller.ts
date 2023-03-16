import { Controller, Get, Redirect } from '@nestjs/common';
import { GeneratorService } from './app.service';

@Controller()
export class AppController {
  constructor(private service: GeneratorService) {}

  // generates mocj data for testing
  @Get('generate_data')
  async generateMockData(): Promise<string> {
    await this.service.generateMockData();
    return 'Mock data generated, user Swagger UI to test the data';
  }

  @Get()
  @Redirect(process.env.DOCS_ENDPOINT, 302)
  async home() {
    return 'Welcome to the subscription service';
  }
}
