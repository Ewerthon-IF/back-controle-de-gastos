import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { RevendasService } from './revenda.service';

@Controller('revenda')
export class RevendaController {
  constructor(private revendaService: RevendasService) {}

  @Get('regiao/:regiaoId')
  listarPorRegiao(@Param('regiaoId') regiaoId: number) {
    return this.revendaService.listarPorRegiao(regiaoId);
  }

  @Patch('quantidade')
  async atualizarQuantidade(
    @Body('id') id: number, // id da revenda
    @Body('regiao_id') regiao_id: number, // id da região
    @Body('telha_id') telha_id: number, // id da telha
    @Body('quantidade') quantidade: number,
  ) {
    return this.revendaService.atualizarQuantidadePorIdRevenda(id, regiao_id, telha_id, quantidade);
  }

  @Get()
  listarTodas() {
    return this.revendaService.listarTodas();
  }
}

