import { PaginationDto } from '../dto/pagination.dto';

export const getCacheKeyForAllApi = (paginationDto: PaginationDto) => {
  return `api_all_properties_${paginationDto.skip}_${paginationDto.limit}`;
};
