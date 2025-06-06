import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Regioes } from './regioes.entity';

@Entity('movimentacoes')
export class Movimentacoes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ['compra', 'venda'] })
  tipo: 'compra' | 'venda';

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @ManyToOne(() => Regioes, { nullable: true })
  @JoinColumn({ name: 'regiao_id' })
  regiao: Regioes;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;
}
