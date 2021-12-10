import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty } from 'class-validator';

export class SetDefaultCardDto {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  user_id: string;

  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325asd0f3ae' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  card_id: string;
}
