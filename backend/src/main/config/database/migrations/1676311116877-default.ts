import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676311116877 implements MigrationInterface {
    name = 'default1676311116877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poketeam" DROP CONSTRAINT "FK_f48284660b5e9177c5f35482331"`);
        await queryRunner.query(`ALTER TABLE "poketeam" DROP CONSTRAINT "UQ_f48284660b5e9177c5f35482331"`);
        await queryRunner.query(`ALTER TABLE "poketeam" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "poketeam" ADD "userId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "poketeam" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "poketeam" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "poketeam" ADD CONSTRAINT "UQ_f48284660b5e9177c5f35482331" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "poketeam" ADD CONSTRAINT "FK_f48284660b5e9177c5f35482331" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
