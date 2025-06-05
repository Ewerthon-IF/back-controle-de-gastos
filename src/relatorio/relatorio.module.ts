import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacoes } from '../entities/movimentacoes.entity';
import { RelatorioController } from './relatorio.controller';
import { RelatorioService } from './relatorio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movimentacoes])],
  providers: [RelatorioService],
  controllers: [RelatorioController],
})
export class RelatorioModule {}
