import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  account: string;

  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  total_service_amount: number;

  @IsNotEmpty()
  @ApiProperty({ example: 100 })
  transfer_money: number;
}

export default CreateTransferDto;
