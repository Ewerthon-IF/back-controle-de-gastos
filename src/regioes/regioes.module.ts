import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regioes } from '../entities/regioes.entity';
import { RegioesController } from './regioes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Regioes])],
  controllers: [RegioesController],
})
export class RegioesModule {}
