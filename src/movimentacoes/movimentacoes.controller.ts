import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Movimentacoes } from '../entities/movimentacoes.entity';
import { MovimentacoesService } from './movimentacoes.service';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Get('relatorio')
  async obterRelatorio() {
    return this.movimentacoesService.gerarRelatorio();
  }

  @Get()
  listarTodas(): Promise<Movimentacoes[]> {
    return this.movimentacoesService.listarTodas();
  }

  @Get(':id')
  buscarPorId(@Param('id') id: number): Promise<Movimentacoes> {
    return this.movimentacoesService.buscarPorId(id);
  }

  @Post()
  criar(@Body() body: Partial<Movimentacoes>): Promise<Movimentacoes> {
    return this.movimentacoesService.criar(body);
  }
}
