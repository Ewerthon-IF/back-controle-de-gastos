import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Revenda } from './revenda.entity';

@Entity('regioes')
export class Regioes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  catalogo: string;

  @OneToMany(() => Revenda, (revenda) => revenda.regioes)
  revendas: Revenda[];
}