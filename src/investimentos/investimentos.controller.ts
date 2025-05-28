import { Controller, Get, Param } from '@nestjs/common';
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

}
