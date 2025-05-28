import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { Revenda } from '../entities/revenda.entity';
import { RevendaController } from './revenda.controller';
import { RevendaService } from './revenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revenda, Investimentos])],
  providers: [RevendaService],
  controllers: [RevendaController],
  exports: [RevendaService],
})
export class RevendaModule {}