import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';

export class SendVerificationTokenDTO {
  @Allow()
  @ApiProperty({ example: '+13235534022' })
  @Transform((value: string) => {
    if (value.substring(0, 1) != '+') {
      value = '+' + value;
    }
    return value;
  })
  phone_number: string;
}
