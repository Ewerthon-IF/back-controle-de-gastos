import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Regioes } from './regioes.entity';

@Entity('Revenda')

export class Revenda {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome_telha: string;

  @Column()
  comprimento: string;

  @Column()
  largura: string;

  @Column()
  cor: string;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_revenda: number;

  @ManyToOne(() => Regioes, (regioes) => regioes.revendas)
  @JoinColumn({ name: 'regiao_id' })
  regioes: Regioes;

}