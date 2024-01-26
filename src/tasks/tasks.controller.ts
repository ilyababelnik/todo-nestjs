import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { QueryFilterDto } from 'src/application/dto/query.filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Post('/')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<GetTaskDto> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/')
  findAllTasks(@Query() queryFilter?: QueryFilterDto): Promise<GetTaskDto[]> {
    return this.tasksService.findAllTasks(queryFilter);
  }

  @Get(':id')
  findOneTask(@Param('id', ParseUUIDPipe) id: string): Promise<GetTaskDto> {
    return this.tasksService.findOneTask(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id', ParseUUIDPipe) id: string): Promise<GetTaskDto> {
    return this.tasksService.removeTask(id);
  }
}
