import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, Validate } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BankAccount extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ type:'uuid', nullable: false })
  user_id: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 100, nullable: false })
  account_name: string;

  @ApiProperty({ example: 'Bank of US' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 100, nullable: false })
  bank_name: string;

  @ApiProperty({ example: '0123000000908' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 20, nullable: false })
  account_no: string;

  @ApiProperty({ example: 'ABCDEFG1234' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 100, nullable: false })
  bank_routing_number : string;

  @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
  @Validate(IsExist, ['Country', 'id'], {
    message: 'Country not Found',
  })
  @Column({ nullable: false })
  country_id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
