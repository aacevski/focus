import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1667770364076 implements MigrationInterface {
    name = 'migrations1667770364076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" integer, "groupId" integer, CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_b09836eba01a8653c0628a78af8" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note" ADD CONSTRAINT "FK_5eddabd757ad92950ccc0d866cb" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_5eddabd757ad92950ccc0d866cb"`);
        await queryRunner.query(`ALTER TABLE "note" DROP CONSTRAINT "FK_b09836eba01a8653c0628a78af8"`);
        await queryRunner.query(`DROP TABLE "note"`);
    }

}
