import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investimentos } from '../entities/investimentos.entity';

@Injectable()
export class InvestimentosService {
    constructor(
        @InjectRepository(Investimentos)
        private investimentosRepository: Repository<Investimentos>,
    ) {}

    async criar(investimento: Investimentos): Promise<Investimentos> {
        return this.investimentosRepository.save(investimento);
    }

    async listarTodos(): Promise<Investimentos[]> {
        return this.investimentosRepository.find();
    }

    async buscar(id: number): Promise<Investimentos> {
        return this.investimentosRepository.findOne({ where: { id } });
    }

    async atualizar(id: number, investimento: Investimentos): Promise<Investimentos> {
        await this.investimentosRepository.update(id, investimento);
        return this.buscar(id);
    }

    async atualizarQuantidade(
        nome_telha: string,
        comprimento: string,
        largura: string,
        cor: string,
        regiao_id: number,
        novoQuantidade: number
    ): Promise<Investimentos | null> {
        const investimento = await this.investimentosRepository.findOne({
            where: {
                nome_telha,
                comprimento,
                largura,
                cor,
                regiao_id,
            },
        });

        if (!investimento) return null;

        investimento.quantidade = novoQuantidade;
        return this.investimentosRepository.save(investimento);
    }

    async remover(id: number): Promise<void> {
        await this.investimentosRepository.delete(id);
    }

}
