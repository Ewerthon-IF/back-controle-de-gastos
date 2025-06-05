import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentacoes } from 'src/entities/movimentacoes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelatorioService {
  constructor(
    @InjectRepository(Movimentacoes)
    private movimentacoesRepository: Repository<Movimentacoes>,
  ) {}

  async relatorioFinanceiro() {
    try {
      const movimentacoes = await this.movimentacoesRepository.find({ relations: ['regiao'] });
      // Agrupa por regiao e nome_telha
      const agrupado = {};
      for (const mov of movimentacoes) {
        const regiao = mov.regiao?.nome || 'Desconhecida';
        const nomeTelha = mov.nome;
        const key = regiao + '|' + nomeTelha;
        if (!agrupado[key]) {
          agrupado[key] = {
            regiao,
            nomeTelha,
            totalGasto: 0,
            totalRecebido: 0,
            saldoFinanceiro: 0,
            movimentacoes: [],
          };
        }
        if (mov.tipo === 'compra') {
          agrupado[key].totalGasto += Number(mov.preco) * Number(mov.quantidade);
        } else if (mov.tipo === 'venda') {
          agrupado[key].totalRecebido += Number(mov.preco) * Number(mov.quantidade);
        }
        agrupado[key].movimentacoes.push({
          tipo: mov.tipo,
          quantidade: mov.quantidade,
          preco: Number(mov.preco),
          data: mov.data,
        });
      }
      // Calcula saldoFinanceiro
      for (const key in agrupado) {
        agrupado[key].saldoFinanceiro = agrupado[key].totalRecebido - agrupado[key].totalGasto;
      }
      return Object.values(agrupado);
    } catch (e) {
      return { error: 'Erro ao gerar relatório financeiro', details: e.message };
    }
  }
}
