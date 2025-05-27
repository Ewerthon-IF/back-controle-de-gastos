import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { InvestimentosController } from './investimentos.controller';
import { InvestimentosService } from './investimentos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investimentos]), HttpModule],
  providers: [InvestimentosService],
  controllers: [InvestimentosController]
})
export class InvestimentosModule {}
