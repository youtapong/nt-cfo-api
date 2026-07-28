import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { BranchesModule } from './branches/branches.module';
import { BuildingsModule } from './buildings/buildings.module';
import { OrgUser } from './entities/org-user.entity';
import { OrgCompany } from './entities/org-company.entity';
import { OrgBranch } from './entities/org-branch.entity';
import { OrgBuilding } from './entities/org-building.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USER') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'postgres',
        database: configService.get<string>('DB_NAME') || 'postgres',
        entities: [OrgUser, OrgCompany, OrgBranch, OrgBuilding],
        synchronize: false, // Set to false to prevent database modification in production
      }),
    }),
    AuthModule,
    UsersModule,
    CompaniesModule,
    BranchesModule,
    BuildingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
