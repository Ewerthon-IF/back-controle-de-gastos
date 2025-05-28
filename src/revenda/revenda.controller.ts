import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { RevendaService } from './revenda.service';

@Controller('revenda')
export class RevendaController {
  constructor(private revendaService: RevendaService) {}

  @Get('regiao/:regiaoId')
  listarPorRegiao(@Param('regiaoId') regiaoId: number) {
    return this.revendaService.listarPorRegiao(regiaoId);
  }

  @Patch('quantidade')
  async atualizarQuantidade(
    @Body('nome_telha') nome_telha: string,
    @Body('regiao_id') regiao_id: number,
    @Body('quantidade') quantidade: number,
  ) {
    return this.revendaService.atualizarQuantidadePorNomeERegiao(nome_telha, regiao_id, quantidade);
  }
  
}

