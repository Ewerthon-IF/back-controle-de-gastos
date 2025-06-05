import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investimentos } from '../entities/investimentos.entity';
import { MovimentacoesService } from '../movimentacoes/movimentacoes.service';

@Injectable()

export class InvestimentosService {
    
    constructor(
        @InjectRepository(Investimentos)
        private investimentosRepository: Repository<Investimentos>,
        private movimentacoesService: MovimentacoesService,
    ) {}

    async listarTodos(): Promise<Investimentos[]> {
        return this.investimentosRepository.find();
    }

    async buscar(telha_id: number): Promise<Investimentos> {
        return this.investimentosRepository.findOne({ where: { telha_id } });
    }

    async atualizar(telha_id: number, investimento: Investimentos): Promise<Investimentos> {
        await this.investimentosRepository.update(telha_id, investimento);
        return this.buscar(telha_id);
    }

    async atualizarQuantidade(
        novoQuantidade: number
    ): Promise<Investimentos | null> {
        const investimento = await this.investimentosRepository.findOne({
            where: {
                quantidade: novoQuantidade
            },
        });

        if (!investimento) return null;

        investimento.quantidade = novoQuantidade;
        return this.investimentosRepository.save(investimento);
    }

    async remover(id: number): Promise<void> {
        await this.investimentosRepository.delete(id);
    }

    async atualizarQuantidadePorId(telha_id: number, quantidade: number) {
        const investimento = await this.investimentosRepository.findOne({ where: { telha_id } });
        if (!investimento) {
            throw new Error('Investimento não encontrado para o id informado');
        }
        investimento.quantidade += quantidade;
        await this.investimentosRepository.save(investimento);
        // Registra movimentação de compra
                await this.movimentacoesService.criar({
                  tipo: 'compra',
                  nome: investimento.nome_telha,
                  quantidade,
                  preco: investimento.preco_compra,
                  regiao: investimento.regioes,
                });
        return investimento;
    }

}
