import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
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

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'test@mailinator.com' })
  payee_email: number;
}

export default CreateTransferDto;
