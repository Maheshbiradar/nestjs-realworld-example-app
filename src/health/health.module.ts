import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  providers: [HealthService],
  controllers: [
    HealthController
  ],
  exports: []
})
export class HealthModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
  }
}
