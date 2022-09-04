import { MigrationInterface, QueryRunner } from "typeorm";

export class profilePicture1662324815089 implements MigrationInterface {
    name = 'profilePicture1662324815089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
    }

}
