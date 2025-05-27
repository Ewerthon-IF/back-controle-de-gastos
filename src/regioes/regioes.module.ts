import { Module } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { RegioesController } from './regioes.controller';

@Module({
  providers: [RegioesService],
  controllers: [RegioesController]
})
export class RegioesModule {}
