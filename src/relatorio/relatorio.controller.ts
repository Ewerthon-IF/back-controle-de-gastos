import { Controller, Get } from '@nestjs/common';
import { RelatorioService } from './relatorio.service';

@Controller('relatorios')
export class RelatorioController {
  constructor(private readonly relatorioService: RelatorioService) {}

  @Get('financeiro')
  async getRelatorioFinanceiro() {
    return this.relatorioService.relatorioFinanceiro();
  }
}
