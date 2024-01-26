import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnIsCompletedITaskTable1706106360392 implements MigrationInterface {
    name = 'UpdateColumnIsCompletedITaskTable1706106360392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "isCompleted" character varying NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_68dd13c489276e884a50941b41" ON "tasks" ("isCompleted") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_68dd13c489276e884a50941b41"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "isCompleted" boolean NOT NULL`);
    }

}
