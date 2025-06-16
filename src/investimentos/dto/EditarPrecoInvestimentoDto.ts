import { IsNumber, IsPositive } from 'class-validator';

export class EditarPrecoInvestimentoDto {
  @IsNumber()
  telha_id: number;

  @IsNumber()
  @IsPositive()
  novoPreco: number;
}
