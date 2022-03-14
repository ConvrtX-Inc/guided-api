import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'price_1Kd5OKKn5tIlJ89hGsR5KQB3' })
  price_stripe_id: string;
}

export default CreateSubscriptionDto;
