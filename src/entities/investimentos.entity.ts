import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('investimentos')

export class Investimentos {
    
  @PrimaryGeneratedColumn()
  telha_id: number;

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
  preco_compra: number;

}