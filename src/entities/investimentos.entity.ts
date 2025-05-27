import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Investimentos')

export class Investimentos {
    
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

  @Column()
  preco_compra: number;

}