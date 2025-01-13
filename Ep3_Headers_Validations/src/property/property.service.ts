import { Injectable } from '@nestjs/common';
import { async } from 'rxjs';

@Injectable()
export class PropertyService {
  async findAll() {
    return 'All properties';
  }

  async findOne(id: string) {
    return `Property ${id}`;
  }

  async create(body: any) {
    return body;
  }

  async update(id: string, body: any) {
    return body;
  }
}
