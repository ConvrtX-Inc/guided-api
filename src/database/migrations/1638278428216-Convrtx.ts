import {MigrationInterface, QueryRunner} from "typeorm";

export class Convrtx1638278428216 implements MigrationInterface {
    name = 'Convrtx1638278428216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "is_online" boolean NOT NULL DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_verified" SET DEFAULT 'FALSE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_verified" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_online"`);
    }

}
