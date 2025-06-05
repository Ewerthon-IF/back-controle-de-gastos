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

  async listarTodas() {
    return this.movimentacoesRepository.find({ relations: ['regiao'] });
  }

  async buscarPorId(telha_id: number) {
    return this.movimentacoesRepository.findOne({ where: { telha_id }, relations: ['regiao'] });
  }

  async criar(mov: Partial<Movimentacoes>) {
    const nova = this.movimentacoesRepository.create(mov);
    await this.movimentacoesRepository.save(nova);

    // Corrigir: atualizar investimento apenas pelo telha_id se informado
    if (mov.tipo === 'compra' && mov['telha_id']) {
      const investimento = await this.investimentosRepository.findOne({ where: { telha_id: mov['telha_id'] } });
      if (investimento) {
        investimento.quantidade += mov.quantidade;
        investimento.preco_compra = mov.preco;
        await this.investimentosRepository.save(investimento);
      }
    } else if (mov.tipo === 'venda' && mov['id']) {
      // Atualizar revenda apenas pelo id
      const revenda = await this.revendaRepository.findOne({ where: { id: mov['id'] } });
      if (revenda) {
        revenda.quantidade -= mov.quantidade;
        await this.revendaRepository.save(revenda);
      }
    }

    return nova;
  }

  async gerarRelatorio() {
    const investimentos = await this.investimentosRepository.find();
    const revendas = await this.revendaRepository.find();
    const totalCompras = investimentos.reduce((soma, item) => {
      return soma + item.quantidade * Number(item.preco_compra);
    }, 0);
    const totalVendas = revendas.reduce((soma, item) => {
      return soma + item.quantidade * Number(item.preco_revenda);
    }, 0);
    return {
      totalCompras: totalCompras.toFixed(2),
      totalVendas: totalVendas.toFixed(2),
      saldo: (totalVendas - totalCompras).toFixed(2),
    };
  }
}
