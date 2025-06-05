import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { Revenda } from '../entities/revenda.entity';
import { MovimentacoesModule } from '../movimentacoes/movimentacoes.module';
import { RevendaController } from './revenda.controller';
import { RevendasService } from './revenda.service';

@Module({
  imports: [TypeOrmModule.forFeature([Revenda, Investimentos]), MovimentacoesModule],
  controllers: [RevendaController],
  providers: [RevendasService],
  exports: [RevendasService],
})
export class RevendaModule {}