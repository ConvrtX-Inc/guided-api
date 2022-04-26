import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AcceptStripeAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  account_id: string;
}

export default AcceptStripeAccountDto;
