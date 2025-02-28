import { Test, TestingModule } from '@nestjs/testing';
import { PropertyService } from './property.service';
import { Property } from 'src/entities/property.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/createProperty.dto';

// follow the rule: Arrange-Act-Assert pattern
// run test: npm run test -- property.service.spec.ts
describe('PropertyService', () => {
  let service: PropertyService;
  const mockPropertyRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertyService,
        {
          provide: getRepositoryToken(Property),
          useValue: mockPropertyRepository,
        },
      ],
    }).compile();

    service = module.get<PropertyService>(PropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create => should create a new property and return saved data', async () => {
    // arrange
    const propertyDto = {
      name: 'Property 1',
      description: 'new property',
      price: 10,
    } as CreatePropertyDto;

    const savedProperty = {
      id: 1,
      name: 'Property 1',
      description: 'new property',
      price: 10,
    } as Property;

    jest.spyOn(mockPropertyRepository, 'save').mockReturnValue(savedProperty);

    // act
    const result = await service.create(propertyDto);

    // assert
    expect(mockPropertyRepository.save).toHaveBeenCalled();
    expect(mockPropertyRepository.save).toHaveBeenCalledWith(propertyDto);
    expect(result).toEqual(savedProperty);
  });

  //   it('findAll', () => {});
  //   it('findOne', () => {});
  //   it('update', () => {});
  //   it('remove', () => {});
});
