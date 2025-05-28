import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from './entities/investimentos.entity';
import { Regioes } from './entities/regioes.entity';
import { Revenda } from './entities/revenda.entity';

import { InvestimentosModule } from './investimentos/investimentos.module';
import { RegioesModule } from './regioes/regioes.module';
import { RevendaModule } from './revenda/revenda.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'macacorosa',
      database: 'controle',
      entities: [Investimentos, Regioes, Revenda],
      synchronize: false
    }),
    InvestimentosModule,
    RegioesModule,
    RevendaModule
  ],
})
export class AppModule {}
