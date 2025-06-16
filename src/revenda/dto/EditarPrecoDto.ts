import { IsNumber, IsPositive } from 'class-validator';

export class EditarPrecoDto {
  @IsNumber()
  id: number;

  @IsNumber()
  regiao_id: number;

  @IsNumber()
  @IsPositive()
  novoPreco: number;
}
