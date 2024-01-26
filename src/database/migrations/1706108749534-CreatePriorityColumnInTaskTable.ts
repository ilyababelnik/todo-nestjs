import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePriorityColumnInTaskTable1706108749534 implements MigrationInterface {
    name = 'CreatePriorityColumnInTaskTable1706108749534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
    }

}
