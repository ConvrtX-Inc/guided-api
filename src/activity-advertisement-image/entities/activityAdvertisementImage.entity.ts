import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsOptional } from "class-validator";
import { EntityHelper } from "src/utils/entity-helper";
import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm";

@Entity()
export class ActivityAdvertisementImage extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsOptional()
    @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
    @Column()
    @Generated('uuid')
    activity_advertisement_id: string;

    @Allow()
    @IsOptional()
    @ApiProperty({ example: 'byte64image' })
    @Column({
        name: 'snapshot_img',
        type: 'bytea',
        nullable: false,
    })
    snapshot_img?: Buffer;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}