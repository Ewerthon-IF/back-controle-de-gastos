import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({ isGlobal: true }), // ← habilita uso em toda a aplicação
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Investimentos, Regioes, Revenda, Movimentacoes],
      synchronize: false,
    }),
    InvestimentosModule,
    RegioesModule,
    RevendaModule,
    MovimentacoesModule,
    RelatorioModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
