import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { EditarPrecoInvestimentoDto } from './dto/EditarPrecoInvestimentoDto';
import { InvestimentosService } from './investimentos.service';

@Controller('investimentos')
export class InvestimentosController {
    constructor(private investimentosService: InvestimentosService) {}

    @Get()
    listarTodos() {
        return this.investimentosService.listarTodos();
    }

    @Get(':id')
    buscarPorId(@Param('id') id: number) {
        return this.investimentosService.buscar(id);
    }

    @Patch('quantidade')
    async atualizarQuantidade(
        @Body('telha_id') telha_id: number,
        @Body('quantidade') quantidade: number,
    ) {
        return this.investimentosService.atualizarQuantidadePorId(telha_id, quantidade);
    }

    @Patch('preco')
    async editarPreco(@Body() body: EditarPrecoInvestimentoDto) {
        return this.investimentosService.editarPreco(body.telha_id, body.novoPreco);
    }
}
