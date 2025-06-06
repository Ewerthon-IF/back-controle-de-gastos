import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Investimentos } from '../entities/investimentos.entity';
import { Movimentacoes } from '../entities/movimentacoes.entity';
import { Revenda } from '../entities/revenda.entity';

import { RegioesModule } from '../regioes/regioes.module';
import { MovimentacoesController } from './movimentacoes.controller';
import { MovimentacoesService } from './movimentacoes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimentacoes, Investimentos, Revenda]),
     RegioesModule
  ],
  providers: [MovimentacoesService],
  controllers: [MovimentacoesController],
  exports: [MovimentacoesService],
})
export class MovimentacoesModule {}
