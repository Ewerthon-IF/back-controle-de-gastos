import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Regioes } from '../entities/regioes.entity';

@Controller('regioes')
export class RegioesController {
  constructor(
    @InjectRepository(Regioes)
    private regioesRepository: Repository<Regioes>,
  ) {}

  @Get()
  async listarTodas() {
    return this.regioesRepository.find();
  }
}
