import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Regioes')

export class Regioes {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  catalogo: string;
  
}