import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { CrudValidationGroups } from '@nestjsx/crud';

@Entity()
export class TransactionPayment extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({ type:'uuid', nullable: false })
    user_id: string;

    @IsOptional()
    @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['Transaction', 'id'], {
        message: 'Transaction not Found',
    })
    @Column({ type: 'uuid', nullable: true })
    transaction_id?: string | null;

    @IsOptional()
    @ApiProperty({ example: 'amount' })
    @Column({ nullable: true, type: 'text' })
    amount?: string;

    @IsOptional()
    @ApiProperty({ example: 'trasaction_number' })
    @Column({ nullable: true, type: 'text' })
    transaction_number?: string;

    @IsOptional()
    @ApiProperty({ example: 'payment_method' })
    @Column({ nullable: true, type: 'text' })
    payment_method?: string;

    @IsOptional()
    @ApiProperty({ example: 'service_name' })
    @Column({ nullable: true, type: 'text' })
    service_name?: string;

    @IsOptional()
    @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
    @Transform((value: string | null) => (value == '' ? null : value))
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({nullable: true })
    to_user_id: string;

    @IsOptional()
    @ApiProperty({ example: 'deduction' })
    @Column({ nullable: true, type: 'text' })
    type?: string;

    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date?: string;

    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date?: string;
}