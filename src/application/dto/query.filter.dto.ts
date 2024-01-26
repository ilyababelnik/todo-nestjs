import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../enums/tasks-status';

export class QueryFilterDto {
  @IsString()
  @IsOptional()
  public name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TasksStatus)
  public status?: TasksStatus;

  @IsOptional()
  @IsString()
  public priority?: string;
}
