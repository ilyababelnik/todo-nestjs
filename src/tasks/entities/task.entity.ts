import { TasksStatus } from '../../application/enums/tasks-status';
import { CoreEntity } from '../../application/entities/core.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'tasks' })
export class Task extends CoreEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 15,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  description: string;

  @Index()
  @Column({
    type: 'varchar',
  })
  status: TasksStatus;

  @Column({
    type: 'integer',
    nullable: true,
  })
  priority: number;
}
