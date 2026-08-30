import { Test } from "@nestjs/testing";
import { HealthController } from "./health.controller";
import { HealthService, HealthStatus } from "./health.service";

describe("HealthController", () => {
  let healthController: HealthController;
  let healthService: { check: jest.Mock };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            check: jest.fn(),
          },
        },
      ],
    }).compile();

    healthService = module.get(HealthService);
    healthController = module.get<HealthController>(HealthController);
  });

  describe("check", () => {
    it("should return the health status with an ISO 8601 timestamp", () => {
      const health: HealthStatus = {
        status: "ok",
        timestamp: "2020-01-01T00:00:00.000Z",
      };

      healthService.check.mockReturnValue(health);

      const checkResult = healthController.check();
      expect(checkResult).toBe(health);
      expect(checkResult.status).toBe("ok");
      expect(new Date(checkResult.timestamp).toISOString()).toBe(checkResult.timestamp);
    });
  });
});
