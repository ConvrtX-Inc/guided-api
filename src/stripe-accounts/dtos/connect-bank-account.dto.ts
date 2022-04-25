import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConnectBankAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  account_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  external_account: string;
}

export default ConnectBankAccountDto;
