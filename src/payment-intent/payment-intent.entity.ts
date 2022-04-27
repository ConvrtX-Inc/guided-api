import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, Validate } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PaymentIntent extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['User', 'id'], {
    message: 'User not Found',
  })
  @Column({ type:'uuid', nullable: false })
  user_id: string;

  @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['BookingRequest', 'id'], {
    message: 'Booking request not Found',
  })
  @Column({ type:'uuid', nullable: false })
  booking_request_id: string;

  @ApiProperty({ example: '123465678' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 100, nullable: false })
  stripe_payment_intent_id: string;

  @ApiProperty({ example: '123465678' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Column({ length: 100, nullable: false })
  stripe_payment_method_id : string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
