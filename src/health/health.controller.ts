import { Get, Controller } from '@nestjs/common';

import { HealthService, HealthStatus } from './health.service';

import {
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {

  constructor(private readonly healthService: HealthService) {}

  @Get()
  check(): HealthStatus {
    return this.healthService.check();
  }

}
