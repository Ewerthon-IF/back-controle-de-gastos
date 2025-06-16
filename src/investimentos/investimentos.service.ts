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

    async atualizarQuantidadePorId(telha_id: number, quantidade: number) {
        const investimento = await this.investimentosRepository.findOne({ where: { telha_id } });
        if (!investimento) {
            throw new Error('Investimento não encontrado para o id informado');
        }
        // Se for venda (quantidade negativa), verifica estoque
        if (quantidade < 0 && investimento.quantidade < Math.abs(quantidade)) {
            throw new Error('Estoque para a telha selecionada insuficiente');
        }
        investimento.quantidade += quantidade;
        await this.investimentosRepository.save(investimento);
        // Registra movimentação
        await this.movimentacoesService.criar({
          tipo: quantidade > 0 ? 'compra' : 'venda',
          nome: investimento.nome_telha,
          quantidade: Math.abs(quantidade),
          preco: investimento.preco_compra,
        });
        return investimento;
    }

    async editarPreco(telha_id: number, novoPreco: number | string) {
        const precoConvertido = typeof novoPreco === 'string' ? parseFloat(novoPreco) : novoPreco;
        const investimento = await this.investimentosRepository.findOne({ where: { telha_id } });
        if (!investimento) {
            throw new Error('Telha não encontrada em investimentos');
        }
        investimento.preco_compra = precoConvertido;
        await this.investimentosRepository.save(investimento);
        return investimento;
    }

    async remover(id: number): Promise<void> {
        await this.investimentosRepository.delete(id);
    }
}
