import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsOptional, Validate } from "class-validator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EntityHelper } from "src/utils/entity-helper";
import { IsExist } from '../../utils/validators/is-exists.validator';

@Entity()
export class ActivityOutfitterImage extends EntityHelper {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @IsOptional()
    @ApiProperty({ example: 'eae25276-3af3-432c-9c1b-7b7548513015' })
    @Validate(IsExist, ['ActivityOutfitter', 'id'], {
        message: 'Activity Outfitter not found',
    })
    @Column()
    activity_outfitter_id: string;

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
    date_created: Date;

    @UpdateDateColumn()
    date_updated: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}