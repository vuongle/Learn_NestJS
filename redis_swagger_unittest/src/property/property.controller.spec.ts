import { Test, TestingModule } from '@nestjs/testing';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { CacheService } from 'src/cache/cache.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { Property } from 'src/entities/property.entity';

// run test: npm run test -- property.controller.spec.ts
describe('PropertyController', () => {
  let propertyController: PropertyController;

  const mockPropertyService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };
  const mockCacheService = {
    get: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PropertyController],
      providers: [
        {
          provide: PropertyService,
          useValue: mockPropertyService,
        },
        {
          provide: CacheService,
          useValue: mockCacheService,
        },
      ],
    }).compile();

    propertyController = app.get<PropertyController>(PropertyController);
  });

  it('should be defined', () => {
    expect(propertyController).toBeDefined();
  });

  it('create => should create a new user by a given data', async () => {
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

    jest.spyOn(mockPropertyService, 'create').mockReturnValue(savedProperty);

    // act
    const result = await propertyController.create(propertyDto);

    // assert
    expect(mockPropertyService.create).toHaveBeenCalled();
    expect(mockPropertyService.create).toHaveBeenCalledWith(propertyDto);

    expect(result).toEqual(savedProperty);
  });
});
