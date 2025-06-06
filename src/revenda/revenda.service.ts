import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { Revenda } from '../entities/revenda.entity';
import { MovimentacoesService } from '../movimentacoes/movimentacoes.service';

@Injectable()
export class RevendasService {
  constructor(
    @InjectRepository(Revenda)
    private revendaRepository: Repository<Revenda>,
    @InjectRepository(Investimentos)
    private investimentoRepository: Repository<Investimentos>,
    private movimentacoesService: MovimentacoesService,
  ) {}

  async listarTodas() {
    return this.revendaRepository.find({ relations: ['regioes'] });
  }

  async listarPorRegiao(regiaoId: number) {
    const where: FindOptionsWhere<Revenda> = {
      regioes: { id: regiaoId },
    } as any;

    return this.revendaRepository.find({ where, relations: ['regioes'] });
  }

  async atualizarQuantidadePorNomeERegiao(
    nome_telha: string,
    regiao_id: number,
    quantidade: number,
    cor: string,
    comprimento: string,
    largura: string,
    telha_id: number,  // agora obrigatório
  ) {
    // Busca a telha na revenda
    const telha = await this.revendaRepository.findOne({
      where: {
        nome_telha,
        cor,
        comprimento,
        largura,
        regioes: { id: regiao_id },
      },
      relations: ['regioes'],
    });

    if (!telha) {
      throw new Error('Telha não encontrada para a região informada');
    }

    // Busca o investimento pelo telha_id
    const investimento = await this.investimentoRepository.findOne({
      where: { telha_id },
    });

    if (!investimento) {
      throw new Error('Investimento não encontrado para a telha informada');
    }

    if (investimento.quantidade < quantidade) {
      throw new Error('Estoque de investimento insuficiente');
    }

    investimento.quantidade -= quantidade;
    await this.investimentoRepository.save(investimento);

    telha.quantidade += quantidade;
    await this.revendaRepository.save(telha);

    await this.movimentacoesService.criar({
      tipo: 'venda',
      nome: telha.nome_telha,
      quantidade,
      preco: telha.preco_revenda,
      regiao: telha.regioes,
    });

    return telha;
  }

  async atualizarQuantidadePorIdRevenda(
    id: number,
    regiao_id: number,
    telha_id: number,
    quantidade: number,
  ) {
    // Busca a telha na revenda pelo ID e região
    const telha = await this.revendaRepository.findOne({
      where: { id, regioes: { id: regiao_id } },
      relations: ['regioes'],
    });

    if (!telha) {
      throw new Error('Telha de revenda não encontrada para a região informada');
    }

    // Busca o investimento pelo telha_id
    const investimento = await this.investimentoRepository.findOne({
      where: { telha_id },
    });

    if (!investimento) {
      throw new Error('Investimento não encontrado para a telha informada');
    }

    if (investimento.quantidade < quantidade) {
      throw new Error(
        `Estoque de investimento insuficiente. Estoque atual: ${investimento.quantidade}, solicitado: ${quantidade}`,
      );
    }

    investimento.quantidade -= quantidade;
    await this.investimentoRepository.save(investimento);

    telha.quantidade += quantidade;
    await this.revendaRepository.save(telha);

    await this.movimentacoesService.criar({
      tipo: 'venda',
      nome: telha.nome_telha,
      quantidade,
      preco: telha.preco_revenda,
      regiao: telha.regioes,
    });

    return telha;
  }
}
