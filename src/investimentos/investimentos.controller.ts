import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Investimentos } from '../entities/investimentos.entity';
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

    @Post()
    criar(@Body() investimento: Investimentos) {
        return this.investimentosService.criar(investimento);
    }
}
