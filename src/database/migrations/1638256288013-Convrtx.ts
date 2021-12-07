import {MigrationInterface, QueryRunner} from "typeorm";

export class Convrtx1638256288013 implements MigrationInterface {
    name = 'Convrtx1638256288013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "deletedAt" TO "deleted_at"`);
        await queryRunner.query(`CREATE TABLE "user_schedule_availability" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying, "available" boolean, "reason" text NOT NULL, "return_date" date, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e71b8319ac13cf0a855681b3c93" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "activity_availability_hours" ADD "slots" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "is_verified" boolean NOT NULL DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "booking_date_start" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "booking_date_end" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "number_of_person" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT 'FALSE'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_type_id" character varying`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "user_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "user_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_type_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "user_type_id" uuid DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_terms_conditions_agreed" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_first_aid_trained" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "is_for_the_planet" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "number_of_person" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "booking_date_end" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "booking_request" ALTER COLUMN "booking_date_start" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_verified"`);
        await queryRunner.query(`ALTER TABLE "activity_availability_hours" DROP COLUMN "slots"`);
        await queryRunner.query(`ALTER TABLE "notification" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "user_schedule_availability"`);
        await queryRunner.query(`ALTER TABLE "transaction" RENAME COLUMN "deleted_at" TO "deletedAt"`);
    }

}
