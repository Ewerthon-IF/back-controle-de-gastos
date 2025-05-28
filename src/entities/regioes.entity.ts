import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Revenda } from './revenda.entity';

@Entity('Regiõs')

export class Regioes {

  @PrimaryGeneratedColumn({ name: 'regiao_id' })
  regiao_id: number;

  @Column()
  nome: string;

  @Column()
  catalogo: string;

  @OneToMany(() => Revenda, (revenda) => revenda.regioes)
  revendas: Revenda[];

}