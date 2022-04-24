import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Validate } from 'class-validator';
import { EntityHelper } from '../utils/entity-helper';
import { Transform } from 'class-transformer';
import { IsExist } from 'src/utils/validators/is-exists.validator';

@Entity()
export class TransactionPayment extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date?: string;

    @IsOptional()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date?: string;
}