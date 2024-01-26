import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TasksStatus } from 'src/application/enums/tasks-status';

export class GetTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(TasksStatus)
  status: TasksStatus;

  @IsNotEmpty()
  @IsInt()
  priority: number;
}
