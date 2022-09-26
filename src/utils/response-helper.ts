import { HttpStatus } from '@nestjs/common';

export const response = (msg: string, data: any, code: any = HttpStatus.OK) => {
  return {
    statusCode: code,
    message: msg,
    data: data,
  };
};
