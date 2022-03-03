import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CheckVerificationTokenDTO {
  @Allow()
  @ApiProperty({ example: '+13235534022' })
  @Transform((value: string) => {
    if (value.substring(0, 1) != '+') {
      value = '+' + value;
    }
    return value;
  })
  phone_number: string;

  @Allow()
  @ApiProperty({ example: '8888' })
  verifyCode: string;
}
