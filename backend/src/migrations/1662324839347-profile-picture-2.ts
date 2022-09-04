import { MigrationInterface, QueryRunner } from "typeorm";

export class profilePicture21662324839347 implements MigrationInterface {
    name = 'profilePicture21662324839347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
    }

}
