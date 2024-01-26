import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnIsCompletedToTaskTable1706103927150
  implements MigrationInterface
{
  name = 'AddColumnIsCompletedToTaskTable1706103927150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "isCompleted" boolean NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_396d500ff7f1b82771ddd812fd"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "name" character varying(15) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" character varying(50) NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_396d500ff7f1b82771ddd812fd" ON "tasks" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_396d500ff7f1b82771ddd812fd"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_396d500ff7f1b82771ddd812fd" ON "tasks" ("name") `,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "isCompleted"`);
  }
}
