import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Transform } from 'class-transformer';
import { Allow, IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookingTransaction extends EntityHelper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2cc5bcab-b726-43a2-98e8-98baa5fce9b4' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['User', 'id'], {
    message: 'Tour guide not found',
  })
  @Column({ type: 'uuid', nullable: false })
  tour_guide_id: string;

  @ApiProperty({ example: '2cc5bcab-b726-43a2-98e8-98baa5fce9b4' })
  @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
  @Validate(IsExist, ['User', 'id'], {
    message: 'Traveler not found',
  })
  @Column({ type: 'uuid', nullable: false })
  traveler_id: string;

  @IsOptional()
  @ApiProperty({ example: 'completed/pending/rejected' })
  @Column({
    type: 'text',
    nullable: true,
  })
  payment_status?: string;

  @IsOptional()
  @ApiProperty({ example: 'google_pay/apple_pay/bank_card' })
  @Column({
    type: 'text',
    nullable: true,
  })
  payment_method?: string;

  @IsOptional()
  @ApiProperty()
  @Column({
    type: 'text',
    nullable: true,
  })
  transaction_number?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  grand_total?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  sub_total?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  price_per_person?: string;

  @IsOptional()
  @ApiProperty({ example: '12.0' })
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  adventure_service_fee?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ example: 0 })
  @Column({
    type: 'integer',
    nullable: false,
  })
  number_of_person?: number;

  @IsOptional()
  @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
  @Transform((value: string | null) => (value == '' ? null : value))
  @Validate(IsExist, ['BookingRequest', 'id'], {
    message: 'Booking request not found',
  })
  @Column({ nullable: true })
  booking_request_id: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
