import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { Revenda } from '../entities/revenda.entity';


@Injectable()

export class RevendaService {

    constructor(
        @InjectRepository(Revenda)
        private revendaRepository: Repository<Revenda>,
        @InjectRepository(Investimentos)
        private investimentoRepository: Repository<Investimentos>,
    ) {}

    async listarPorRegiao(regiaoId: number) {
        const where: FindOptionsWhere<Revenda> = { regioes: { id: regiaoId } } as any;
        return this.revendaRepository.find({ where, relations: ['regioes'] });
    }

    async atualizarQuantidadePorNomeERegiao(nome_telha: string, regiao_id: number, quantidade: number) {
        const where: FindOptionsWhere<Revenda> = { nome_telha, regioes: { regiao_id } } as any;
        const telha = await this.revendaRepository.findOne({ where, relations: ['regioes'] });
        if (!telha) {
            throw new Error('Telha não encontrada para a região informada');
        }
        // Buscar investimento correspondente pelo nome_telha e regiao_id
        const investimento = await this.investimentoRepository.findOne({ where: { nome_telha, regioes: { regiao_id } }, relations: ['regioes'] });
        if (!investimento) {
            throw new Error('Investimento não encontrado para a telha e região informada');
        }
        // Subtrai a quantidade do estoque de investimento
        investimento.quantidade = investimento.quantidade - quantidade;
        if (investimento.quantidade < 0) {
            throw new Error('Estoque de investimento insuficiente');
        }
        await this.investimentoRepository.save(investimento);
        // Subtrai a quantidade do estoque de revenda
        telha.quantidade = telha.quantidade - quantidade;
        if (telha.quantidade < 0) {
            throw new Error('Estoque de revenda insuficiente');
        }
        await this.revendaRepository.save(telha);
        return telha;
    }
    
    async listarTodas() {
        return this.revendaRepository.find({ relations: ['regioes'] });
    }
}
