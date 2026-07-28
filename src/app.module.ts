import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StandardCfoModule } from './standard-cfo/standard-cfo.module';
import { OrganizationModule } from './organization/organization.module';
import { EmissionCalculationModule } from './emission-calculation/emission-calculation.module';
import { AdminModule } from './admin/admin.module';
import { UploadModule } from './upload/upload.module';

// Import all entities
import { OrgUser } from './entities/org-user.entity';
import { OrgCompany } from './entities/org-company.entity';
import { OrgBranch } from './entities/org-branch.entity';
import { OrgBuilding } from './entities/org-building.entity';
import { StdScope } from './entities/std-scope.entity';
import { StdFactorGroup } from './entities/std-factor-group.entity';
import { StdFactorSubgroup } from './entities/std-factor-subgroup.entity';
import { StdFactorCommon } from './entities/std-factor-common.entity';
import { StdEfTgo } from './entities/std-ef-tgo.entity';
import { StdFuelType } from './entities/std-fuel-type.entity';
import { StdFuelBrand } from './entities/std-fuel-brand.entity';
import { StdFuelMapEf } from './entities/std-fuel-map-ef.entity';
import { OrgAsset } from './entities/org-asset.entity';
import { OrgUserBranch } from './entities/org-user-branch.entity';
import { OrgUserAsset } from './entities/org-user-asset.entity';
import { OrgAssetMapEfTgo } from './entities/org-asset-map-ef-tgo.entity';
import { OrgEmission } from './entities/org-emission.entity';
import { OrgEmissionCalculate } from './entities/org-emission-calculate.entity';
import { OrgEmissionEvidence } from './entities/org-emission-evidence.entity';
import { AdminFormular } from './admin/admin-formular.entity';
import { Calculate } from './entities/calculate.entity';

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
        entities: [
          OrgUser,
          OrgCompany,
          OrgBranch,
          OrgBuilding,
          StdScope,
          StdFactorGroup,
          StdFactorSubgroup,
          StdFactorCommon,
          StdEfTgo,
          StdFuelType,
          StdFuelBrand,
          StdFuelMapEf,
          OrgAsset,
          OrgUserBranch,
          OrgUserAsset,
          OrgAssetMapEfTgo,
          OrgEmission,
          OrgEmissionCalculate,
          OrgEmissionEvidence,
          AdminFormular,
          Calculate,
        ],
        synchronize: false, // Set to false to prevent database modification in production
      }),
    }),
    AuthModule,
    UsersModule, // Kept for auth login service internal dependency
    StandardCfoModule,
    OrganizationModule,
    EmissionCalculationModule,
    AdminModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
