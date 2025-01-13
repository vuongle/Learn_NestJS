import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import { PaginationDto } from 'src/property/dto/pagination.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
import { Repository } from 'typeorm';

@Injectable()
export class PropertyService {
  // Use Repository pattern for CRUD
  constructor(
    @InjectRepository(Property)
    private propertyRepo: Repository<Property>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    return await this.propertyRepo.find({
      skip: paginationDto.skip,
      take: paginationDto.limit ?? DEFAULT_PAGE_SIZE,
    });
  }

  async findOne(id: number) {
    const res = await this.propertyRepo.findOne({ where: { id } });
    if (!res) {
      throw new NotFoundException('Property not found');
    }
    return res;
  }

  async create(body: CreatePropertyDto) {
    return await this.propertyRepo.save(body);
  }

  async update(id: number, body: UpdatePropertyDto) {
    return await this.propertyRepo.update({ id }, body);
  }

  async delete(id: number) {
    return await this.propertyRepo.delete(id);
  }
}
