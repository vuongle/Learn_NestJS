import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

// create a custom decorator. this decorator will be used to get the headers from the request
// and validate them.
export const RequestHeader = createParamDecorator(
  async (targetDto: any, ctx: ExecutionContext) => {
    console.log('@RequestHeader');
    // get headers from request
    const headers = ctx.switchToHttp().getRequest().headers;

    // convert headers to a plain object
    const dto = plainToInstance(targetDto, headers, {
      excludeExtraneousValues: true,
    });

    // validate the header
    await validateOrReject(dto);

    return dto;
  },
);
