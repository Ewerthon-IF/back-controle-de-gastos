import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  preco_compra: number;

}
