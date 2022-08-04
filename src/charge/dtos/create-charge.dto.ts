import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChargeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'card_1LSMlyKn5tIlJ89hluRSMWU6' })
  payment_method_id: string;

  @IsNumber()
  @ApiProperty({ example: 100 })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'cus_LtQGewqLepqL1A' })
  customer_id: string;
}

export default CreateChargeDto;
