import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class ActivityAdvertisement extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @IsOptional()
    @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
    @Column()
    @Generated('uuid')
    user_id?: string;

    @ApiProperty({ example: 'Amazing Deal Here!' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, length: 100 })
    title: string;

    @ApiProperty({ example: 'USA' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'char', length: 10 })
    country: string;

    @ApiProperty({ example: '{}' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false, type: 'json'})
    address: string;

    @ApiProperty({ example: '2021-12-31' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false })
    ad_date: Date;

    @ApiProperty({ example: 'One in a lifetime discount on quality products!!!' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @Column({ nullable: false })
    description: string;

    @ApiProperty({ example: '5000.00' })
    @IsOptional({ groups: [CrudValidationGroups.UPDATE] })
    @IsNotEmpty({ groups: [CrudValidationGroups.CREATE] })
    @IsNumber()
    @Column({ nullable: false, type: 'money' })
    price: number;
  
    @IsOptional()
    @ApiProperty({ example: false })
    @Column({ type: 'bool', nullable: true, default: false })
    is_published?: boolean;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
