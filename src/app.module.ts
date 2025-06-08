import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investimentos } from './entities/investimentos.entity';
import { Movimentacoes } from './entities/movimentacoes.entity';
import { Regioes } from './entities/regioes.entity';
import { Revenda } from './entities/revenda.entity';

import { AppController } from './app.controller';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module';
import { RegioesModule } from './regioes/regioes.module';
import { RelatorioModule } from './relatorio/relatorio.module';
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
      entities: [Investimentos, Regioes, Revenda, Movimentacoes],
      synchronize: false,
    }),
    InvestimentosModule,
    RegioesModule,
    RevendaModule,
    MovimentacoesModule,
    RelatorioModule
  ],
  controllers: [AppController],
})
export class AppModule {}
