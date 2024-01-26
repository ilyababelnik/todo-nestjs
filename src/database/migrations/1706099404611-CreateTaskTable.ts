import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTaskTable1706099404611 implements MigrationInterface {
  name = 'CreateTaskTable1706099404611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_396d500ff7f1b82771ddd812fd" ON "tasks" ("name") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_396d500ff7f1b82771ddd812fd"`,
    );
    await queryRunner.query(`DROP TABLE "tasks"`);
  }
}
