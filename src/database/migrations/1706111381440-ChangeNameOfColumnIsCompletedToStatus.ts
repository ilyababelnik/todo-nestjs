import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameOfColumnIsCompletedToStatus1706111381440 implements MigrationInterface {
    name = 'ChangeNameOfColumnIsCompletedToStatus1706111381440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_68dd13c489276e884a50941b41"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "isCompleted" TO "status"`);
        await queryRunner.query(`CREATE INDEX "IDX_6086c8dafbae729a930c04d865" ON "tasks" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6086c8dafbae729a930c04d865"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "status" TO "isCompleted"`);
        await queryRunner.query(`CREATE INDEX "IDX_68dd13c489276e884a50941b41" ON "tasks" ("isCompleted") `);
    }

}
