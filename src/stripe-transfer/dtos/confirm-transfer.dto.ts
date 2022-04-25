import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  payment_intent_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  payment_method_id: string;
}

export default ConfirmTransferDto;
