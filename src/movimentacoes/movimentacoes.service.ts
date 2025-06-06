import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Investimentos } from '../entities/investimentos.entity';
import { Movimentacoes } from '../entities/movimentacoes.entity';
import { Revenda } from '../entities/revenda.entity';

@Injectable()
export class MovimentacoesService {
  constructor(
    @InjectRepository(Movimentacoes)
    private movimentacoesRepository: Repository<Movimentacoes>,

    @InjectRepository(Investimentos)
    private investimentosRepository: Repository<Investimentos>,

    @InjectRepository(Revenda)
    private revendaRepository: Repository<Revenda>,
  ) {}

  async criar(mov: Partial<Movimentacoes>) {
    const nova = this.movimentacoesRepository.create(mov);
    await this.movimentacoesRepository.save(nova);

    return nova;
  }

  async listarTodas() {
    const resultado = await this.movimentacoesRepository.find({ relations: ['regiao'] });
    return Array.isArray(resultado) ? resultado : [];
  }

  async gerarRelatorio() {
    return this.movimentacoesRepository.find({ relations: ['regiao'] });
  }

  async buscarPorId(id: number) {
    return this.movimentacoesRepository.findOne({ where: { id }, relations: ['regiao'] });
  }

  async gerarRelatorioFinanceiro() {
    const movimentacoes = await this.movimentacoesRepository.find({ relations: ['regiao'] });
    const relatorio = [];
    const agrupado = {};
    for (const mov of movimentacoes) {
      const regiao = mov.regiao ? mov.regiao.nome : 'Sem Região';
      const nomeTelha = mov.nome;
      const chave = regiao + '|' + nomeTelha;
      if (!agrupado[chave]) {
        agrupado[chave] = {
          regiao,
          nomeTelha,
          totalGasto: 0,
          totalRecebido: 0,
          movimentacoes: []
        };
      }
      if (mov.tipo === 'compra') {
        agrupado[chave].totalGasto += Number(mov.preco) * mov.quantidade;
      } else if (mov.tipo === 'venda') {
        agrupado[chave].totalRecebido += Number(mov.preco) * mov.quantidade;
      }
      agrupado[chave].movimentacoes.push({
        tipo: mov.tipo,
        quantidade: mov.quantidade,
        preco: Number(mov.preco),
        data: mov.data
      });
    }
    for (const chave in agrupado) {
      agrupado[chave].saldoFinanceiro = agrupado[chave].totalRecebido - agrupado[chave].totalGasto;
      relatorio.push(agrupado[chave]);
    }
    return relatorio;
  }
}
