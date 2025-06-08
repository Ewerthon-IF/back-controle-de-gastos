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
  ) { }

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
      where: {
        telha_id,
        nome_telha,
        cor,
        comprimento,
        largura,
      },
    });

    if (!investimento) {
      throw new Error('Investimento não encontrado para a telha informada');
    }

    if (investimento.quantidade <= 0 || investimento.quantidade < quantidade) {
      throw new Error('Estoque de investimento insuficiente. Estoque atual: ' + investimento.quantidade + ', solicitado: ' + quantidade);
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
    telha_id: number | string,
    quantidade: number,
  ) {
    // Busca a revenda exata pelo id e região
    const telha = await this.revendaRepository.findOne({
      where: { id, regioes: { id: regiao_id } },
      relations: ['regioes'],
    });

    if (!telha) {
      throw new Error('Telha de revenda não encontrada para a região informada');
    }

    // Busca o investimento pelo telha_id (convertendo para number)
    let investimento = await this.investimentoRepository.findOne({
      where: { telha_id: Number(telha_id) },
    });

    // Se não encontrar, tenta buscar pelos atributos
    if (!investimento) {
      investimento = await this.investimentoRepository.findOne({
        where: {
          nome_telha: telha.nome_telha,
          cor: telha.cor,
          comprimento: telha.comprimento,
          largura: telha.largura,
        },
      });
    }

    if (!investimento) {
      throw new Error('Investimento não encontrado para a telha informada no estoque central');
    }

    // Confirma se os atributos da revenda e do investimento batem
    if (
      investimento.nome_telha !== telha.nome_telha ||
      investimento.cor !== telha.cor ||
      investimento.comprimento !== telha.comprimento ||
      investimento.largura !== telha.largura
    ) {
      throw new Error('A telha selecionada não corresponde ao investimento selecionado.');
    }

    investimento.quantidade -= quantidade;
    await this.investimentoRepository.save(investimento);

    // Soma na revenda
    telha.quantidade += quantidade;
    await this.revendaRepository.save(telha);

    // Registra movimentação de venda para a região correta
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
