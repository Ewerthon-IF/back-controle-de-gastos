import { Module } from '@nestjs/common';
import { RevendaService } from './revenda.service';
import { RevendaController } from './revenda.controller';

@Module({
  providers: [RevendaService],
  controllers: [RevendaController]
})
export class RevendaModule {}
