import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { AuthTokenGuard } from "src/common/guards/auth-token.guard";
import { SyncJobDto } from "./dto/sync-job.dto";
import { IntegrationsService } from "./integrations.service";

@ApiTags("Integrations")
@ApiBearerAuth()
@UseGuards(AuthTokenGuard)
@Controller("integrations")
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get("connectors")
  @ApiOperation({
    summary: "List external integration patterns and security methods",
  })
  listConnectors() {
    return this.integrationsService.listConnectors();
  }

  @Post("sync-jobs")
  @ApiOperation({
    summary: "Queue a synchronization job for an external platform",
  })
  @ApiBody({ type: SyncJobDto })
  @ApiOkResponse({
    schema: {
      example: {
        status: "queued",
        correlationId: "sync-1741674839000",
      },
    },
  })
  runSync(@Body() payload: SyncJobDto) {
    return this.integrationsService.runSync(payload);
  }
}
