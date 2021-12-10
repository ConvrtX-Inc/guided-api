import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsOptional, Validate } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { IsExist } from "src/utils/validators/is-exists.validator";
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Card extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Validate(IsExist, ['User', 'id'], {
      message: 'User not Found',
    })
    @Column({ type:'uuid', nullable: false })
    user_id: string;

    @ApiProperty({ example: false })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({type: 'bool', nullable: false})
    is_default: boolean;

    @ApiProperty({ example: 'John' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 100, nullable: false })
    full_name: string;

    @ApiProperty({ example: 'address' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 100, nullable: false })
    address: string;

    @ApiProperty({ example: 'Manila' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 100, nullable: false })
    city: string;

    @ApiProperty({ example: '1127' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 50, nullable: false })
    postal_code: string;

    @ApiProperty({ example: '08b79d9f-6e44-4ce0-82d3-88f4663d7ef0' })
    @Validate(IsExist, ['Country', 'id'], {
      message: 'Country not Found',
    })
    @Column({ nullable: false })
    country_id: string;

    @ApiProperty({ example: '5122323287789876' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 20, nullable: false })
    card_no: string;

    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ length: 100, nullable: false })
    name_on_card: string;

    @IsOptional()
    @ApiProperty({ example: '10/22/24' })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ type: 'timestamp', nullable: false  })
    expiry_date: string;

    @ApiProperty({ example: 123 })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ type: 'integer', nullable: false })
    cvv: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_date: Date;
}
