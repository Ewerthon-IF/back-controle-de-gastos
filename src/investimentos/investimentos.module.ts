import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { MovimentacoesModule } from '../movimentacoes/movimentacoes.module';
import { InvestimentosController } from './investimentos.controller';
import { InvestimentosService } from './investimentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investimentos]), HttpModule, MovimentacoesModule],
  providers: [InvestimentosService],
  controllers: [InvestimentosController],
  exports: [InvestimentosService],
})
export class InvestimentosModule {}
