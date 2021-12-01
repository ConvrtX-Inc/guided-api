import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ActivityOutfitter extends EntityHelper{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsOptional()
    @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
    @Column()
    @Generated('uuid')
    user_id?: string;

    @ApiProperty({ example: 'Sports Gloves' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, length: 100 })
    title: string;

    @ApiProperty({ example: '1000.00' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @IsNumber()
    @Column({ nullable: false, type: 'money' })
    price: number;

    @ApiProperty({ example: 'https://productlink.com' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE, CrudValidationGroups.CREATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, length: 200 })
    product_link: string;

    @ApiProperty({ example: 'USA' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'char', length: 10 })
    country: string;

    @ApiProperty({ example: 'USA' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'json'})
    address: string;

    @ApiProperty({ example: '2021-12-30' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'timestamp' })
    availability_date: Date;

    @ApiProperty({ example: 'The no. 1 sports gloves in the market' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'text' })
    description: string;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}