import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgCompany } from '../entities/org-company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(OrgCompany)
    private companiesRepository: Repository<OrgCompany>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<OrgCompany> {
    const newCompany = this.companiesRepository.create({
      ...createCompanyDto,
      createDate: new Date(),
    });
    return this.companiesRepository.save(newCompany);
  }

  async findAll(): Promise<OrgCompany[]> {
    return this.companiesRepository.find();
  }

  async findOne(id: number): Promise<OrgCompany> {
    const company = await this.companiesRepository.findOne({
      where: { companyId: id },
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<OrgCompany> {
    const company = await this.findOne(id);
    const updatedCompany = this.companiesRepository.merge(company, {
      ...updateCompanyDto,
      updateDate: new Date(),
    });
    return this.companiesRepository.save(updatedCompany);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companiesRepository.remove(company);
  }
}
