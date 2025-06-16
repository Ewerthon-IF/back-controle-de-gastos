import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EditarPrecoDto } from './dto/EditarPrecoDto';
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

  @Patch('preco')
  async editarPrecoPorRegiao(@Body() body: EditarPrecoDto) {
    return this.revendaService.editarPrecoPorRegiao(body.id, body.regiao_id, body.novoPreco);
  }

  @Get()
  listarTodas() {
    return this.revendaService.listarTodas();
  }

  @Post('zerar-tudo')
  async zerarTudo() {
    return this.revendaService.zerarEstoquesERelatorioFinanceiro();
  }
}

