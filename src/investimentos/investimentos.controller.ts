import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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
}
