import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1666985201877 implements MigrationInterface {
    name = 'migrations1666985201877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "group" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "groupId" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_598199a4bf2ce7f0423037af872" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af997e6623c9a0e27c241126988" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af997e6623c9a0e27c241126988"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_598199a4bf2ce7f0423037af872"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "groupId"`);
        await queryRunner.query(`DROP TABLE "group"`);
    }

}
