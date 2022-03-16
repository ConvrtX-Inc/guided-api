import {MigrationInterface, QueryRunner} from "typeorm";

export class Convrtx1647430473289 implements MigrationInterface {
    name = 'Convrtx1647430473289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "is_terms_and_conditions" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "is_traveler_release_and_waiver_form" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "is_cancellation_policy" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "is_payment_and_payout_terms" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "is_local_laws_and_taxes" boolean DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_verified" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_online" SET DEFAULT 'FALSE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_online" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_verified" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "is_local_laws_and_taxes"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "is_payment_and_payout_terms"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "is_cancellation_policy"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "is_traveler_release_and_waiver_form"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" DROP COLUMN "is_terms_and_conditions"`);
        await queryRunner.query(`ALTER TABLE "users_terms_and_condition" ADD "description" text`);
    }

}
